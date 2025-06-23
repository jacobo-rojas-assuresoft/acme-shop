import { JwtPayloadUser } from '../auth/auth.types';

declare module 'express' {
  interface Request {
    user?: JwtPayloadUser;
  }
}
