import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  HttpException,
  HttpStatus,
  Headers,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  private extractSessionId(headers: any): string | undefined {
    return headers['x-session-id'];
  }

  @Get()
  async getCart(@Request() req: any, @Headers() headers: any) {
    const userId = req.user?.id;
    const sessionId = this.extractSessionId(headers);

    if (!userId && !sessionId) {
      throw new HttpException(
        'User must be authenticated or provide session ID',
        HttpStatus.BAD_REQUEST
      );
    }

    const cart = await this.cartService.getCart(userId, sessionId);
    return cart || { items: [] };
  }

  @Post('add')
  async addToCart(
    @Body() addToCartDto: AddToCartDto,
    @Request() req: any,
    @Headers() headers: any
  ) {
    const userId = req.user?.id;
    const sessionId = this.extractSessionId(headers) || addToCartDto.sessionId;

    if (!userId && !sessionId) {
      throw new HttpException(
        'User must be authenticated or provide session ID',
        HttpStatus.BAD_REQUEST
      );
    }

    try {
      return await this.cartService.addToCart(addToCartDto, userId);
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to add item to cart',
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Patch('items/:itemId')
  async updateCartItem(
    @Param('itemId') itemId: string,
    @Body() updateCartItemDto: UpdateCartItemDto,
    @Request() req: any,
    @Headers() headers: any
  ) {
    const userId = req.user?.id;
    const sessionId = this.extractSessionId(headers);

    if (!userId && !sessionId) {
      throw new HttpException(
        'User must be authenticated or provide session ID',
        HttpStatus.BAD_REQUEST
      );
    }

    try {
      return await this.cartService.updateCartItem(
        itemId,
        updateCartItemDto,
        userId,
        sessionId
      );
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to update cart item',
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Delete('items/:itemId')
  async removeFromCart(
    @Param('itemId') itemId: string,
    @Request() req: any,
    @Headers() headers: any
  ) {
    const userId = req.user?.id;
    const sessionId = this.extractSessionId(headers);

    if (!userId && !sessionId) {
      throw new HttpException(
        'User must be authenticated or provide session ID',
        HttpStatus.BAD_REQUEST
      );
    }

    try {
      return await this.cartService.removeFromCart(itemId, userId, sessionId);
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to remove item from cart',
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Delete('clear')
  async clearCart(@Request() req: any, @Headers() headers: any) {
    const userId = req.user?.id;
    const sessionId = this.extractSessionId(headers);

    if (!userId && !sessionId) {
      throw new HttpException(
        'User must be authenticated or provide session ID',
        HttpStatus.BAD_REQUEST
      );
    }

    try {
      await this.cartService.clearCart(userId, sessionId);
      return { message: 'Cart cleared successfully' };
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to clear cart',
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Post('merge')
  @UseGuards(JwtAuthGuard)
  async mergeGuestCart(
    @Request() req: any,
    @Body() body: { sessionId: string }
  ) {
    const userId = req.user.id;
    const { sessionId } = body;

    if (!sessionId) {
      throw new HttpException('Session ID is required', HttpStatus.BAD_REQUEST);
    }

    try {
      return await this.cartService.mergeGuestCart(userId, sessionId);
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to merge cart',
        HttpStatus.BAD_REQUEST
      );
    }
  }
}
