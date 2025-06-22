import { Field, InputType, PartialType } from '@nestjs/graphql';
import { IsInt, Min } from 'class-validator';
import { CreateProductInput } from './create-product.input';

@InputType()
export class UpdateProductInput extends PartialType(CreateProductInput) {
  @Field()
  @IsInt()
  @Min(1, { message: 'Invalid product ID' })
  id: number;
}
