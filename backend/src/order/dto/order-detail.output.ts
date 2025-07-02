import { Field, ObjectType, Int } from '@nestjs/graphql';
import { ProductOutput } from '../../product/dto/product.output';

@ObjectType()
export class OrderDetailOutput {
  @Field(() => Int)
  quantity: number;

  @Field(() => Int)
  price: number;

  @Field(() => ProductOutput)
  product: ProductOutput;
}
