import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CartService } from '../cart/cart.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { Order, OrderStatus } from '@prisma/client';

@Injectable()
export class OrdersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cartService: CartService
  ) {}

  async create(userId: string, createOrderDto: CreateOrderDto): Promise<Order> {
    const { sessionId } = createOrderDto;

    // Get user's cart (or merge if sessionId provided)
    let cart;
    if (sessionId) {
      cart = await this.cartService.mergeGuestCart(userId, sessionId);
    } else {
      cart = await this.cartService.getCart(userId);
    }

    if (!cart || cart.items.length === 0) {
      throw new Error('Cart is empty');
    }

    // Validate stock availability for all items
    const stockValidation = await Promise.all(
      cart.items.map(async (item) => {
        const product = await this.prisma.product.findUnique({
          where: { id: item.productId },
        });

        if (!product || !product.isActive) {
          throw new Error(
            `Product ${item.product.name} is no longer available`
          );
        }

        if (product.stock < item.quantity) {
          throw new Error(`Insufficient stock for ${item.product.name}`);
        }

        return { item, product };
      })
    );

    // Calculate total amount
    const totalAmount = stockValidation.reduce((total, { item, product }) => {
      return total + Number(product.price) * item.quantity;
    }, 0);

    // Create order with transaction
    const result = await this.prisma.$transaction(async (tx) => {
      // Create order
      const order = await tx.order.create({
        data: {
          userId,
          totalAmount,
          status: OrderStatus.PENDING,
        },
      });

      // Create order items and update stock
      for (const { item, product } of stockValidation) {
        await tx.orderItem.create({
          data: {
            orderId: order.id,
            productId: item.productId,
            quantity: item.quantity,
            price: product.price,
          },
        });

        // Update product stock
        await tx.product.update({
          where: { id: item.productId },
          data: {
            stock: {
              decrement: item.quantity,
            },
          },
        });
      }

      // Clear cart
      await tx.cartItem.deleteMany({
        where: { cartId: cart.id },
      });

      return order;
    });

    // Return complete order with items
    return this.findOne(result.id);
  }

  async findAll(userId?: string): Promise<Order[]> {
    const where = userId ? { userId } : {};

    return this.prisma.order.findMany({
      where,
      include: {
        items: {
          include: {
            product: true,
          },
        },
        user: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string): Promise<Order | null> {
    return this.prisma.order.findUnique({
      where: { id },
      include: {
        items: {
          include: {
            product: {
              include: {
                category: true,
              },
            },
          },
        },
        user: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
      },
    });
  }

  async findByUser(userId: string): Promise<Order[]> {
    return this.prisma.order.findMany({
      where: { userId },
      include: {
        items: {
          include: {
            product: {
              include: {
                category: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async updateStatus(
    id: string,
    updateOrderStatusDto: UpdateOrderStatusDto
  ): Promise<Order> {
    const { status } = updateOrderStatusDto;

    const order = await this.prisma.order.findUnique({
      where: { id },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!order) {
      throw new Error('Order not found');
    }

    // Handle stock restoration for cancelled orders
    if (
      status === OrderStatus.CANCELLED &&
      order.status !== OrderStatus.CANCELLED
    ) {
      await this.prisma.$transaction(async (tx) => {
        // Restore stock for all items
        for (const item of order.items) {
          await tx.product.update({
            where: { id: item.productId },
            data: {
              stock: {
                increment: item.quantity,
              },
            },
          });
        }

        // Update order status
        await tx.order.update({
          where: { id },
          data: { status },
        });
      });
    } else {
      await this.prisma.order.update({
        where: { id },
        data: { status },
      });
    }

    return this.findOne(id);
  }

  async getOrderStats(userId?: string) {
    const where = userId ? { userId } : {};

    const stats = await this.prisma.order.groupBy({
      by: ['status'],
      where,
      _count: {
        status: true,
      },
      _sum: {
        totalAmount: true,
      },
    });

    const totalOrders = await this.prisma.order.count({ where });
    const totalRevenue = await this.prisma.order.aggregate({
      where: {
        ...where,
        status: {
          in: [
            OrderStatus.CONFIRMED,
            OrderStatus.PROCESSING,
            OrderStatus.SHIPPED,
            OrderStatus.DELIVERED,
          ],
        },
      },
      _sum: {
        totalAmount: true,
      },
    });

    return {
      totalOrders,
      totalRevenue: totalRevenue._sum.totalAmount
        ? Number(totalRevenue._sum.totalAmount)
        : 0,
      statusBreakdown: stats.reduce(
        (acc, stat) => {
          acc[stat.status] = {
            count: stat._count.status,
            revenue: stat._sum.totalAmount ? Number(stat._sum.totalAmount) : 0,
          };
          return acc;
        },
        {} as Record<string, { count: number; revenue: number }>
      ),
    };
  }
}
