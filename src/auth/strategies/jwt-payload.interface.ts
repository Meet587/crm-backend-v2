import { UserRoleEnum } from 'src/db/entities/user.entity';

export interface JwtPayload {
  email: string;
  sub: string,
  role: UserRoleEnum;
}
