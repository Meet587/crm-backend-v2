import { SetMetadata } from '@nestjs/common';
import { UserRoleEnum } from '../../db/entities/user.entity';

export const Roles = (...roles: UserRoleEnum[]) => SetMetadata('roles', roles);
