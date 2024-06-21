import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './products.entity';
import { StoreReq } from './products.dto';
import { Request, Response } from 'express';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async create(@Body() req: StoreReq) {
    // we can use class-validator
    // https://docs.nestjs.com/techniques/validation
    // https://github.com/typestack/class-validator
    if (!req.name) throw new BadRequestException('name is required');
    if (!req.description)
      throw new BadRequestException('description is required');
    if (!req.tags) throw new BadRequestException('tags is required');
    if (!req.price) throw new BadRequestException('price is required');

    return this.productsService.create(
      req.name,
      req.description,
      req.tags,
      req.price,
    );
  }

  @Get()
  async findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Product> {
    const product = await this.productsService.findById(id);
    if (product === null) {
      throw new NotFoundException(`product '${id}' doesn't exist`);
    }
    return product;
  }
}
