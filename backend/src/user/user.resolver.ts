import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserOutput } from './dto/user.output';
import { CreateUserInput } from './dto/create-user.input';

@Resolver(() => UserOutput)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [UserOutput])
  getUsers(): Promise<UserOutput[]> {
    return this.userService.findAll();
  }

  @Mutation(() => UserOutput)
  createUser(@Args('input') input: CreateUserInput): Promise<UserOutput> {
    return this.userService.create(input);
  }
}
