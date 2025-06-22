import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt, Min } from 'class-validator';

@InputType()
export class OrderItemInput {
  @Field(() => Int)
  @IsInt()
  @Min(1, { message: 'Product ID must be a positive integer' })
  productId: number;

  @Field(() => Int)
  @IsInt()
  @Min(1, { message: 'Quantity must be at least 1' })
  quantity: number;
}
