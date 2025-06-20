import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from 'src/user/dto/create-user.input';
import { User } from '../entities/user.entity';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { LoginResponse } from './dto/login-response.output';
import { LoginUserInput } from './dto/login-user.input';
import { GqlAuthGuard } from './guards/gql-auth.guard';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {}

  @Mutation(() => LoginResponse)
  async login(@Args('input') input: LoginUserInput) {
    const { email, password } = input;
    const user = await this.authService.validateUser(email, password);
    if (!user) throw new Error('Invalid credentials');
    return await this.authService.login(user);
  }

  @Mutation(() => LoginResponse)
  async register(@Args('input') input: CreateUserInput): Promise<LoginResponse> {
    const existing = await this.userService.findByEmail(input.email);
    if (existing) {
      throw new Error('The email address is already registered.');
    }

    const user = await this.userService.create(input);
    const token = await this.authService.login(user);

    return {
      access_token: token.access_token,
      user,
    };
  }

  @Query(() => User)
  @UseGuards(GqlAuthGuard)
  async me(@CurrentUser() user: { id: number }): Promise<User> {
    const foundUser = await this.userService.findById(user.id);

    if (!foundUser) {
      throw new UnauthorizedException('User no longer exists.');
    }

    return foundUser;
  }
}
