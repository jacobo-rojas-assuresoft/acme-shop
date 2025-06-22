import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsString, MaxLength, Min, MinLength } from 'class-validator';

@InputType()
export class CreateProductInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  @MinLength(2, { message: 'Name must be at least 2 characters' })
  @MaxLength(100, { message: 'Name must be at most 100 characters' })
  name: string;

  @Field({ nullable: true })
  @IsString()
  @MaxLength(255, { message: 'Description too long' })
  description?: string;

  @Field()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  sku: string;

  @Field(() => Int)
  @IsInt()
  @Min(0, { message: 'Price cannot be negative' })
  price: number;

  @Field(() => Int)
  @IsInt()
  @Min(0, { message: 'Cost cannot be negative' })
  cost: number;

  @Field(() => Int)
  @IsInt()
  @Min(0, { message: 'Stock cannot be negative' })
  stock: number;

  @Field({ nullable: true })
  @IsString()
  @MaxLength(255, { message: 'Image URL too long' })
  image?: string;
}
