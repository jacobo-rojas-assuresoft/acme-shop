import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { verifyPasswords } from 'src/utils/auth';
import { JwtPayloadUser } from './auth.types';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService
  ) {}

  async validateUser(email: string, pass: string) {
    const user = await this.userService.findByEmail(email);
    if (user && (await verifyPasswords(pass, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: JwtPayloadUser) {
    const payload = { sub: user.id, name: user.name, email: user.email, role: user.role };
    return {
      access_token: await this.jwtService.signAsync(payload),
      user,
    };
  }
}
