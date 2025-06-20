import { UserRoleEnum } from 'src/db/entities/user.entity';

export interface JwtPayload {
  username: string
  sub: string,
  role: UserRoleEnum;
}
