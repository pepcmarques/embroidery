import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { Cart, CartItem } from '@prisma/client';

@Injectable()
export class CartService {
  constructor(private readonly prisma: PrismaService) {}

  // Get or create cart for user or guest session
  async getOrCreateCart(userId?: string, sessionId?: string): Promise<Cart> {
    if (userId) {
      let cart = await this.prisma.cart.findUnique({
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
      });

      if (!cart) {
        cart = await this.prisma.cart.create({
          data: { userId },
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
        });
      }

      return cart;
    }

    if (sessionId) {
      let cart = await this.prisma.cart.findUnique({
        where: { sessionId },
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
      });

      if (!cart) {
        cart = await this.prisma.cart.create({
          data: { sessionId },
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
        });
      }

      return cart;
    }

    throw new Error('Either userId or sessionId must be provided');
  }

  async addToCart(addToCartDto: AddToCartDto, userId?: string): Promise<Cart> {
    const { productId, quantity, sessionId } = addToCartDto;

    // Check if product exists and has sufficient stock
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product || !product.isActive) {
      throw new Error('Product not found or inactive');
    }

    if (product.stock < quantity) {
      throw new Error('Insufficient stock');
    }

    const cart = await this.getOrCreateCart(userId, sessionId);

    // Check if item already exists in cart
    const existingItem = await this.prisma.cartItem.findUnique({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId,
        },
      },
    });

    if (existingItem) {
      const newQuantity = existingItem.quantity + quantity;

      if (product.stock < newQuantity) {
        throw new Error('Insufficient stock for requested quantity');
      }

      await this.prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: newQuantity },
      });
    } else {
      await this.prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId,
          quantity,
        },
      });
    }

    return this.getOrCreateCart(userId, sessionId);
  }

  async updateCartItem(
    cartItemId: string,
    updateCartItemDto: UpdateCartItemDto,
    userId?: string,
    sessionId?: string
  ): Promise<Cart> {
    const { quantity } = updateCartItemDto;

    const cartItem = await this.prisma.cartItem.findUnique({
      where: { id: cartItemId },
      include: {
        cart: true,
        product: true,
      },
    });

    if (!cartItem) {
      throw new Error('Cart item not found');
    }

    // Verify ownership
    if (userId && cartItem.cart.userId !== userId) {
      throw new Error('Unauthorized');
    }

    if (sessionId && cartItem.cart.sessionId !== sessionId) {
      throw new Error('Unauthorized');
    }

    if (cartItem.product.stock < quantity) {
      throw new Error('Insufficient stock');
    }

    await this.prisma.cartItem.update({
      where: { id: cartItemId },
      data: { quantity },
    });

    return this.getOrCreateCart(userId, sessionId);
  }

  async removeFromCart(
    cartItemId: string,
    userId?: string,
    sessionId?: string
  ): Promise<Cart> {
    const cartItem = await this.prisma.cartItem.findUnique({
      where: { id: cartItemId },
      include: { cart: true },
    });

    if (!cartItem) {
      throw new Error('Cart item not found');
    }

    // Verify ownership
    if (userId && cartItem.cart.userId !== userId) {
      throw new Error('Unauthorized');
    }

    if (sessionId && cartItem.cart.sessionId !== sessionId) {
      throw new Error('Unauthorized');
    }

    await this.prisma.cartItem.delete({
      where: { id: cartItemId },
    });

    return this.getOrCreateCart(userId, sessionId);
  }

  async clearCart(userId?: string, sessionId?: string): Promise<void> {
    const cart = await this.getOrCreateCart(userId, sessionId);

    await this.prisma.cartItem.deleteMany({
      where: { cartId: cart.id },
    });
  }

  async getCart(userId?: string, sessionId?: string): Promise<Cart | null> {
    if (userId) {
      return this.prisma.cart.findUnique({
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
      });
    }

    if (sessionId) {
      return this.prisma.cart.findUnique({
        where: { sessionId },
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
      });
    }

    return null;
  }

  // Merge guest cart with user cart when user logs in
  async mergeGuestCart(userId: string, sessionId: string): Promise<Cart> {
    const guestCart = await this.prisma.cart.findUnique({
      where: { sessionId },
      include: { items: true },
    });

    if (!guestCart || guestCart.items.length === 0) {
      return this.getOrCreateCart(userId);
    }

    const userCart = await this.getOrCreateCart(userId);

    // Merge items from guest cart to user cart
    for (const guestItem of guestCart.items) {
      const existingItem = await this.prisma.cartItem.findUnique({
        where: {
          cartId_productId: {
            cartId: userCart.id,
            productId: guestItem.productId,
          },
        },
      });

      if (existingItem) {
        // Update quantity
        await this.prisma.cartItem.update({
          where: { id: existingItem.id },
          data: { quantity: existingItem.quantity + guestItem.quantity },
        });
      } else {
        // Create new item
        await this.prisma.cartItem.create({
          data: {
            cartId: userCart.id,
            productId: guestItem.productId,
            quantity: guestItem.quantity,
          },
        });
      }
    }

    // Delete guest cart
    await this.prisma.cart.delete({
      where: { id: guestCart.id },
    });

    return this.getOrCreateCart(userId);
  }
}
