import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Product } from './products.entity';
import { QueryFailedError, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private repository: Repository<Product>,
  ) {}
  private readonly products: Product[] = [
    {
      id: '123213',
      name: 'Test',
      description: 'My first product',
      tags: 'A1,A8',
      price: 1255,
    },
  ];

  async create(
    name: string,
    description: string,
    tags: string[],
    price: number,
  ): Promise<Product> {
    try {
      const product = await this.repository.save({
        name,
        description,
        tags: tags.join(','),
        price,
      });
      return product;
    } catch (e) {
      if (e instanceof QueryFailedError) {
        throw new ConflictException(e.message);
      }
      throw new InternalServerErrorException(e);
    }
  }

  async findAll(): Promise<Product[]> {
    return this.repository.find();
  }

  async findById(id: string): Promise<Product> {
    return this.repository.findOne({
      where: {
        id,
      },
    });
  }
}
