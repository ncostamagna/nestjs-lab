import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './products.entity';
import {StoreReq} from './products.dto';

@Controller('products')
export class ProductsController {

    constructor(private readonly productsService: ProductsService) {}

    @Post()
    async create(@Body() req: StoreReq) {
        console.log(req)
        return this.productsService.create(req.name, req.description, req.tags, req.price);
    }

    @Get()
    async findAll(): Promise<Product[]> {
        return this.productsService.findAll();
    }

    @Get(':id')
    async findById(@Param("id") id:string): Promise<Product> {
        return this.productsService.findById(id);
    }
}
