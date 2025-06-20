import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, /*Matches,*/ IsNotEmpty, MaxLength, MinLength } from 'class-validator';

@InputType()
export class LoginUserInput {
  @Field()
  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @Field()
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @MaxLength(32, { message: 'Password must not exceed 30 characters' })
  // @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]+$/, {
  //   message: 'Password must contain at least one letter and one number',
  // })
  password: string;
}
