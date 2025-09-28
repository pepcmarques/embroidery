import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Request,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminGuard } from '../auth/guards/admin.guard';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Request() req: any, @Body() createOrderDto: CreateOrderDto) {
    const userId = req.user.id;

    try {
      return await this.ordersService.create(userId, createOrderDto);
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to create order',
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard, AdminGuard)
  async findAll() {
    return this.ordersService.findAll();
  }

  @Get('my-orders')
  @UseGuards(JwtAuthGuard)
  async findMyOrders(@Request() req: any) {
    const userId = req.user.id;
    return this.ordersService.findByUser(userId);
  }

  @Get('stats')
  @UseGuards(JwtAuthGuard, AdminGuard)
  async getStats() {
    return this.ordersService.getOrderStats();
  }

  @Get('my-stats')
  @UseGuards(JwtAuthGuard)
  async getMyStats(@Request() req: any) {
    const userId = req.user.id;
    return this.ordersService.getOrderStats(userId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Request() req: any) {
    const order = await this.ordersService.findOne(id);

    if (!order) {
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }

    // Check if user owns the order or is admin
    if (req.user && (req.user.id === order.userId || req.user.is_admin)) {
      return order;
    }

    // For non-authenticated users, don't return the order
    throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
  }

  @Patch(':id/status')
  @UseGuards(JwtAuthGuard, AdminGuard)
  async updateStatus(
    @Param('id') id: string,
    @Body() updateOrderStatusDto: UpdateOrderStatusDto
  ) {
    try {
      return await this.ordersService.updateStatus(id, updateOrderStatusDto);
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to update order status',
        HttpStatus.BAD_REQUEST
      );
    }
  }
}
