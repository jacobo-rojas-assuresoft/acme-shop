import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, MaxLength, MinLength } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field({ description: 'Unique email of the user' })
  @IsEmail()
  email: string;

  @Field({ description: 'User display name' })
  @MinLength(3)
  @MaxLength(50)
  name: string;

  @Field({ description: 'Password with minimum 6 characters' })
  @MinLength(6)
  password: string;
}
