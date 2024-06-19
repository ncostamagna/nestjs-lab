import { Injectable } from '@nestjs/common';
import { Product } from './products.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductsService {

    constructor(
        @InjectRepository(Product)
        private repository: Repository<Product>,
    ){}
    private readonly products: Product[] = [
        {
            id: "123213",
            name: "Test",
            description: "My first product",
            tags: "A1,A8",
            price: 1255
        }
    ];
    
    create(name: string, description: string, tags: string[], price:number): Promise<Product> {
        console.log(tags)
        return this.repository.save({
            name,
            description,
            tags: tags.join(","),
            price,
        })
    }

    findAll(): Promise<Product[]> {
        return this.repository.find();
    }

    findById(id: string): Product {
        return this.products.find((element) => element.id === id)
    }
}
