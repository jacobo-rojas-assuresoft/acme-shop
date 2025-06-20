import { Query, Resolver } from '@nestjs/graphql';
import { ProductOutput } from './dto/product.output';
import { ProductService } from './product.service';

@Resolver()
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Query(() => [ProductOutput])
  async getProducts(): Promise<ProductOutput[]> {
    return this.productService.findAll();
  }
}
