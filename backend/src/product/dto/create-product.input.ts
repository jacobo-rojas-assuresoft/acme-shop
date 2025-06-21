import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateProductInput {
  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  sku: string;

  @Field(() => Int)
  price: number;

  @Field(() => Int)
  cost: number;

  @Field(() => Int)
  stock: number;

  @Field({ nullable: true })
  imageUrl?: string;
}
