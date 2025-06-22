import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserRole } from 'src/enums/user-role.enum';
import { Roles } from '../auth/decorators/roles.decorator';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Product } from '../entities/product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { ProductOutput } from './dto/product.output';
import { UpdateProductInput } from './dto/update-product.input';
import { ProductService } from './product.service';

@Resolver(() => Product)
@UseGuards(GqlAuthGuard, RolesGuard)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Query(() => [ProductOutput])
  async getProducts(): Promise<ProductOutput[]> {
    return this.productService.findAll();
  }

  @Query(() => [Product])
  async products(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Query(() => Product)
  async product(@Args('id', { type: () => Int }) id: number): Promise<Product> {
    return this.productService.findById(id);
  }

  @Mutation(() => Product)
  @Roles(UserRole.ADMIN)
  async createProduct(@Args('input') input: CreateProductInput): Promise<Product> {
    return this.productService.create(input);
  }

  @Mutation(() => Product)
  async updateProduct(
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: UpdateProductInput
  ): Promise<Product> {
    return this.productService.update(id, input);
  }

  @Mutation(() => Boolean)
  @Roles(UserRole.ADMIN)
  async deleteProduct(@Args('id', { type: () => Int }) id: number): Promise<boolean> {
    return this.productService.delete(id);
  }
}
