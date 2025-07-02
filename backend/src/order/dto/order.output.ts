import { Field, ObjectType, Int } from '@nestjs/graphql';
import { OrderStatus } from '../../enums/order-status.enum';
import { OrderDetailOutput } from './order-detail.output';

@ObjectType()
export class OrderOutput {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  totalPrice: number;

  @Field(() => OrderStatus)
  status: OrderStatus;

  @Field()
  createdAt: Date;

  @Field(() => [OrderDetailOutput])
  orderDetails: OrderDetailOutput[];
}
