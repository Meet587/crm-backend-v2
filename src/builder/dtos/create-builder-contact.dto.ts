import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateBuilderContactDto {
  @ApiProperty({
    description: 'The name of the contact person',
    example: 'John Doe',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'The email of the contact person',
    example: 'john.doe@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'The phone number of the contact person',
    example: '+919876543210',
  })
  @IsPhoneNumber('IN')
  @IsNotEmpty()
  phone: string;

  @ApiProperty({
    description: 'The designation of the contact person',
    example: 'Manager',
  })
  @IsString()
  @IsOptional()
  designation?: string;

  @ApiProperty({
    description: 'Whether the contact person is primary',
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  is_primary?: boolean;
}
