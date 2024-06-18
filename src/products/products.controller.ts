import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './interfaces/products.interface';

@Controller('products')
export class ProductsController {

    constructor(private readonly productsService: ProductsService) {}

    @Post()
    async create(@Body() createProductDTO: Product) {
        return this.productsService.create(createProductDTO);
    }

    @Get()
    async findAll(): Promise<Product[]> {
        return this.productsService.findAll();
    }
}
