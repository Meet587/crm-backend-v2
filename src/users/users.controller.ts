import { Controller, Get, UseGuards } from '@nestjs/common/decorators';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CacheControl } from 'src/helpers/cache.decorator';
import { JwtAuthGuard } from '../auth/strategies/jwt-auth.guard';
import { RolesGuard } from '../auth/strategies/roles.guard';
import { UserService } from './users.service';

@Controller('users')
@ApiTags('User Management')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('get-all-users')
  @CacheControl(300)
  // @Roles(UserRole.ADMIN)
  @ApiOperation({
    summary: 'get all user list',
    operationId: 'getAllUserList',
  })
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }
}
