import { Field, ID, ObjectType } from '@nestjs/graphql';
import { UserRole } from '../../enums/user-role.enum';

@ObjectType()
export class UserOutput {
  @Field(() => ID)
  id: number;

  @Field()
  email: string;

  @Field()
  name: string;

  @Field(() => UserRole)
  role: UserRole;

  @Field()
  active: boolean;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
