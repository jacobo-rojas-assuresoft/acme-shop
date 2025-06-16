import { Resolver, Query } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { ProductOutput } from './dto/product.output';

@Resolver()
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Query(() => [ProductOutput])
  async getProducts(): Promise<ProductOutput[]> {
    return this.productService.findAll();
  }
}
