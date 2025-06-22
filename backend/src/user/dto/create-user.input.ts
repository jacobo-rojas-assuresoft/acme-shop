import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  @IsEmail()
  @MaxLength(100)
  @IsNotEmpty()
  email: string;

  @Field()
  @MinLength(3)
  @MaxLength(50)
  @IsNotEmpty()
  name: string;

  @Field()
  @MinLength(6)
  @MaxLength(30)
  password: string;
}
