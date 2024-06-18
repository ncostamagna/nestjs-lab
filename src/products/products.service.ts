import { Injectable } from '@nestjs/common';
import { Product } from './interfaces/products.interface';

@Injectable()
export class ProductsService {

    private readonly products: Product[] = [
        {
            id: "123213",
            name: "Test",
            description: "My first product",
            tag: ["A1", "A8"],
            price: 1255
        }
    ];
    
    create(product: Product) {
        this.products.push(product);
    }

    findAll(): Product[] {
        return this.products;
    }
}
