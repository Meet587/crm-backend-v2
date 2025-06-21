import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ClientStatusEnumEnum } from '../../db/entities/client.entity';

export class CreateClientDto {
  @ApiProperty({ description: 'The first name of the client' })
  @IsString()
  first_name: string;

  @ApiProperty({ description: 'The last name of the client' })
  @IsString()
  last_name: string;

  @ApiProperty({
    description: 'The email address of the client',
    uniqueItems: true,
  })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'The phone number of the client' })
  @IsString()
  phone: string;

  @ApiProperty({ description: 'The address of the client', required: false })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({ description: 'The occupation of the client', required: false })
  @IsOptional()
  @IsString()
  occupation?: string;

  @ApiProperty({
    description: 'The minimum budget of the client',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  budget_min?: number;

  @ApiProperty({
    description: 'The maximum budget of the client',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  budget_max?: number;

  @ApiProperty({
    description: 'The preferred location of the client',
    required: false,
  })
  @IsOptional()
  @IsString()
  preferred_location?: string;

  @ApiProperty({
    description: 'The status of the client',
    enum: ClientStatusEnumEnum,
    default: ClientStatusEnumEnum.ACTIVE,
    required: false,
  })
  @IsOptional()
  @IsEnum(ClientStatusEnumEnum)
  status?: ClientStatusEnumEnum;

  @ApiProperty({
    description: 'Additional notes about the client',
    required: false,
  })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiProperty({
    description: 'The ID of the original lead that converted to this client',
    required: false,
  })
  @IsOptional()
  @IsString()
  original_lead_id?: string;
}
