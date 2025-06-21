import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { CommissionStatusEnum } from '../../db/entities/commission.entity';

export class CreateCommissionDto {
  @ApiProperty({
    description: 'The ID of the deal associated with the commission',
  })
  @IsString()
  deal_id: string;

  @ApiProperty({
    description: 'The ID of the builder associated with the commission',
  })
  @IsString()
  builder_id: string;

  @ApiProperty({ description: 'The amount of the commission' })
  @IsNumber()
  amount: number;

  @ApiProperty({ description: 'The commission rate percentage' })
  @IsNumber()
  rate: number;

  @ApiProperty({
    description: 'The status of the commission',
    enum: CommissionStatusEnum,
    default: CommissionStatusEnum.PENDING,
    required: false,
  })
  @IsOptional()
  @IsEnum(CommissionStatusEnum)
  status?: CommissionStatusEnum;

  @ApiProperty({
    description: 'The due date of the commission',
    type: 'string',
    format: 'date',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  due_date?: Date;

  @ApiProperty({
    description: 'The date the commission was paid',
    type: 'string',
    format: 'date',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  paid_date?: Date;

  @ApiProperty({
    description: 'The invoice number for the commission',
    required: false,
  })
  @IsOptional()
  @IsString()
  invoice_number?: string;

  @ApiProperty({
    description: 'Additional notes about the commission',
    required: false,
  })
  @IsOptional()
  @IsString()
  notes?: string;
}
