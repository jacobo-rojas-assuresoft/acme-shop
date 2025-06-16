import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ProductOutput {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  sku: string;

  @Field({ nullable: true })
  image?: string;

  @Field(() => Int)
  price: number;

  @Field(() => Int)
  cost: number;

  @Field(() => Int)
  stock: number;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
