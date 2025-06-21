import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { UserRoleEnum } from '../../db/entities/user.entity';

export class CreateUserDto {
  @ApiProperty({ description: 'The username of the user', uniqueItems: true })
  @IsString()
  username: string;

  @ApiProperty({
    description: 'The email address of the user',
    uniqueItems: true,
  })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'The password of the user' })
  @IsString()
  password_hash: string;

  @ApiProperty({
    description: 'The role of the user',
    enum: UserRoleEnum,
    default: UserRoleEnum.AGENT,
    required: false,
  })
  @IsOptional()
  @IsEnum(UserRoleEnum)
  role?: UserRoleEnum;

  @ApiProperty({ description: 'The first name of the user', required: false })
  @IsOptional()
  @IsString()
  first_name?: string;

  @ApiProperty({ description: 'The last name of the user', required: false })
  @IsOptional()
  @IsString()
  last_name?: string;

  @ApiProperty({ description: 'The phone number of the user', required: false })
  @IsOptional()
  @IsString()
  phone?: string;
}
