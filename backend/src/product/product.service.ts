import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { GetProductsArgs } from './dto/get-products.args';
import { UpdateProductInput } from './dto/update-product.input';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>
  ) {}

  async findWithPagination(args: GetProductsArgs): Promise<Product[]> {
    try {
      const { search, limit, offset = 0 } = args;

      if (limit <= 0 || offset < 0) {
        throw new Error('Invalid pagination parameters');
      }

      const query = this.productRepo.createQueryBuilder('product');

      if (search) {
        query.where([{ name: Like(`%${search}%`) }, { description: Like(`%${search}%`) }]);
      }

      const result = await query.skip(offset).take(limit).getMany();
      return result;
    } catch (error: unknown) {
      throw new Error(
        `Failed to fetch products: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

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
