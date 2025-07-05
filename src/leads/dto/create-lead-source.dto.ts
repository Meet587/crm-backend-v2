import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { LeadSourceTypeEnum } from '../../db/entities/lead-source.entity';

export class CreateLeadSourceDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ enum: LeadSourceTypeEnum })
  @IsEnum(LeadSourceTypeEnum)
  @IsNotEmpty()
  type: LeadSourceTypeEnum;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;
}
