import { UserRole } from 'src/enums/user-role.enum';

export type JwtPayloadUser = {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  active: boolean;
};

export interface JwtPayload {
  sub: number;
  email: string;
  role: string;
}
