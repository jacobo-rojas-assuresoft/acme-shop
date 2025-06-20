import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { LoginResponse } from './dto/login-response.output';
import { LoginUserInput } from './dto/login-user.input';

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
    console.log('User after login->>:', user);
    return await this.authService.login(user);
  }
}
