import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class OrderItemInput {
  @Field(() => Int)
  productId: number;

  @Field(() => Int)
  quantity: number;
}
