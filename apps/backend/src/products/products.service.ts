import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductQueryDto } from './dto/product-query.dto';
import { Product } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    return this.prisma.product.create({
      data: createProductDto,
      include: {
        category: true,
      },
    });
  }

  async findAll(query: ProductQueryDto = {}) {
    const {
      categoryId,
      search,
      minPrice,
      maxPrice,
      isActive = true,
      page = 1,
      limit = 12,
    } = query;

    const skip = (page - 1) * limit;
    const take = limit;

    const where = {
      isActive,
      ...(categoryId && { categoryId }),
      ...(search && {
        OR: [
          { name: { contains: search, mode: 'insensitive' as const } },
          { description: { contains: search, mode: 'insensitive' as const } },
        ],
      }),
      ...(minPrice !== undefined || maxPrice !== undefined
        ? {
            price: {
              ...(minPrice !== undefined && { gte: minPrice }),
              ...(maxPrice !== undefined && { lte: maxPrice }),
            },
          }
        : {}),
    };

    const [products, total] = await Promise.all([
      this.prisma.product.findMany({
        where,
        include: {
          category: true,
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take,
      }),
      this.prisma.product.count({ where }),
    ]);

    return {
      products,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: string): Promise<Product | null> {
    return this.prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
      },
    });
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto
  ): Promise<Product> {
    return this.prisma.product.update({
      where: { id },
      data: updateProductDto,
      include: {
        category: true,
      },
    });
  }

  async remove(id: string): Promise<Product> {
    // Check if product is in any carts or orders
    const productInUse = await this.prisma.product.findUnique({
      where: { id },
      include: {
        cartItems: true,
        orderItems: true,
      },
    });

    if (!productInUse) {
      throw new Error('Product not found');
    }

    if (
      productInUse.cartItems.length > 0 ||
      productInUse.orderItems.length > 0
    ) {
      // Soft delete: set as inactive instead of hard delete
      return this.prisma.product.update({
        where: { id },
        data: { isActive: false },
        include: {
          category: true,
        },
      });
    }

    return this.prisma.product.delete({
      where: { id },
    });
  }

  async updateStock(id: string, quantity: number): Promise<Product> {
    return this.prisma.product.update({
      where: { id },
      data: {
        stock: {
          increment: quantity,
        },
      },
      include: {
        category: true,
      },
    });
  }

  async checkStock(id: string, requiredQuantity: number): Promise<boolean> {
    const product = await this.prisma.product.findUnique({
      where: { id },
      select: { stock: true, isActive: true },
    });

    if (!product || !product.isActive) {
      return false;
    }

    return product.stock >= requiredQuantity;
  }
}
