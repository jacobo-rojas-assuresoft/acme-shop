import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import { UpdateProductInput } from './dto/update-product.input';
import { CreateProductInput } from './dto/create-product.input';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>
  ) {}

  async findAll(): Promise<Product[]> {
    return this.productRepo.find();
  }

  async findById(id: number): Promise<Product> {
    const product = await this.productRepo.findOne({ where: { id } });
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async create(input: CreateProductInput): Promise<Product> {
    const product = this.productRepo.create(input);
    return this.productRepo.save(product);
  }

  async update(id: number, input: UpdateProductInput): Promise<Product> {
    const product = await this.findById(id);
    Object.assign(product, input);
    return this.productRepo.save(product);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.productRepo.softDelete(id);
    return result.affected > 0;
  }
}
