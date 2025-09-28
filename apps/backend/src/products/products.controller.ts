import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductQueryDto } from './dto/product-query.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminGuard } from '../auth/guards/admin.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, AdminGuard)
  async create(@Body() createProductDto: CreateProductDto) {
    try {
      return await this.productsService.create(createProductDto);
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to create product',
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Get()
  async findAll(@Query() query: ProductQueryDto) {
    return this.productsService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const product = await this.productsService.findOne(id);
    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
    return product;
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto
  ) {
    try {
      return await this.productsService.update(id, updateProductDto);
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to update product',
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  async remove(@Param('id') id: string) {
    try {
      return await this.productsService.remove(id);
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to delete product',
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Patch(':id/stock')
  @UseGuards(JwtAuthGuard, AdminGuard)
  async updateStock(
    @Param('id') id: string,
    @Body() stockUpdate: { quantity: number }
  ) {
    try {
      return await this.productsService.updateStock(id, stockUpdate.quantity);
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to update stock',
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Get(':id/check-stock')
  async checkStock(
    @Param('id') id: string,
    @Query('quantity') quantity: string
  ) {
    const requiredQuantity = parseInt(quantity, 10);
    if (isNaN(requiredQuantity) || requiredQuantity <= 0) {
      throw new HttpException('Invalid quantity', HttpStatus.BAD_REQUEST);
    }

    const available = await this.productsService.checkStock(
      id,
      requiredQuantity
    );
    return { available, productId: id, requestedQuantity: requiredQuantity };
  }
}
