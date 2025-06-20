import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';
import { ClientStatusEnumEnum } from '../../db/entities/client.entity';
import { LeadSourceEnum, LeadStatusEnum } from '../../db/entities/lead.entity';

export class CreateLeadDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  last_name: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ enum: LeadSourceEnum, required: false })
  @IsOptional()
  @IsEnum(LeadSourceEnum)
  source?: LeadSourceEnum;

  @ApiProperty({ enum: LeadStatusEnum, required: false })
  @IsOptional()
  @IsEnum(LeadStatusEnum)
  status?: LeadStatusEnum;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsUUID()
  assigned_agent_id?: string;
}

export class UpdateLeadDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  first_name?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  last_name?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  phone?: string;

  @ApiProperty({ enum: LeadSourceEnum, required: false })
  @IsOptional()
  @IsEnum(LeadSourceEnum)
  source?: LeadSourceEnum;

  @ApiProperty({ enum: LeadStatusEnum, required: false })
  @IsOptional()
  @IsEnum(LeadStatusEnum)
  status?: LeadStatusEnum;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsUUID()
  assigned_agent_id?: string;
}

export class FindLeadsDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiProperty({ enum: LeadSourceEnum, required: false })
  @IsOptional()
  @IsEnum(LeadSourceEnum)
  source?: LeadSourceEnum;

  @ApiProperty({ enum: LeadStatusEnum, required: false })
  @IsOptional()
  @IsEnum(LeadStatusEnum)
  status?: LeadStatusEnum;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsUUID()
  assigned_agent_id?: string;

  @ApiProperty({ required: false, default: 1 })
  @IsOptional()
  @IsNumber()
  @Min(1)
  page?: number = 1;

  @ApiProperty({ required: false, default: 10 })
  @IsOptional()
  @IsNumber()
  @Min(1)
  limit?: number = 10;
}

export class LeadResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  first_name: string;

  @ApiProperty()
  last_name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  phone: string;

  @ApiProperty({ enum: LeadSourceEnum })
  source: LeadSourceEnum;

  @ApiProperty({ enum: LeadStatusEnum })
  status: LeadStatusEnum;

  @ApiProperty({ required: false })
  notes?: string;

  @ApiProperty({ required: false })
  assigned_agent_id?: string;

  @ApiProperty({ required: false, type: Object })
  assigned_agent?: {
    id: string;
    username: string;
    email: string;
    first_name?: string;
    last_name?: string;
  };

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;
}

export class ConvertLeadDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  first_name?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  last_name?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  phone?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  occupation?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  budget_min?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  budget_max?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  preferred_location?: string;

  @ApiProperty({ enum: ClientStatusEnumEnum, required: false })
  @IsOptional()
  @IsEnum(ClientStatusEnumEnum)
  status?: ClientStatusEnumEnum;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  notes?: string;
}

export class PaginatedResponseDto<T> {
  @ApiProperty({ isArray: true, type: () => Object })
  data: T[];

  @ApiProperty()
  total: number;

  @ApiProperty()
  page: number;

  @ApiProperty()
  limit: number;
}

export class ClientResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  first_name: string;

  @ApiProperty()
  last_name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  phone: string;

  @ApiProperty({ required: false })
  address?: string;

  @ApiProperty({ required: false })
  occupation?: string;

  @ApiProperty({ required: false })
  budget_min?: number;

  @ApiProperty({ required: false })
  budget_max?: number;

  @ApiProperty({ required: false })
  preferred_location?: string;

  @ApiProperty({ enum: ClientStatusEnumEnum })
  status: ClientStatusEnumEnum;

  @ApiProperty({ required: false })
  notes?: string;

  @ApiProperty({ required: false })
  original_lead_id?: string;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;
}
