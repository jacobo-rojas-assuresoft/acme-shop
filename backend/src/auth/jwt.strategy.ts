import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserRole } from 'src/enums/user-role.enum';
import { JwtPayload, JwtPayloadUser } from './auth.types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  validate(payload: JwtPayload): JwtPayloadUser {
    const role = payload.role === 'user' ? UserRole.USER : UserRole.ADMIN;
    return {
      id: payload.sub,
      email: payload.email,
      role,
      name: payload.name ?? '',
      active: payload.active ?? false,
    };
  }
}
