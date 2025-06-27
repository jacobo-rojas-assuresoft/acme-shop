import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class GetProductsArgs {
  @Field({ nullable: true })
  search?: string;

  @Field(() => Int)
  limit: number;

  @Field(() => Int, { nullable: true })
  offset?: number;
}
