import { UserRole } from 'src/enums/user-role.enum';

export type JwtPayloadUser = {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  active: boolean;
};

export type JwtPayload = {
  sub: number;
  email: string;
  role: string;
  name?: string;
  active?: boolean;
};

export interface GqlContext {
  req: {
    user: JwtPayloadUser;
  };
}
