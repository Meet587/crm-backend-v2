import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { DealStatusEnum } from '../../db/entities/deal.entity';

export class CreateDealDto {
  @ApiProperty({ description: 'The id of the lead' })
  @IsNotEmpty()
  @IsUUID()
  lead_id: string;

  @ApiProperty({ description: 'The id of the property' })
  @IsNotEmpty()
  @IsUUID()
  property_id: string;

  @ApiProperty({ description: 'The name of the client' })
  @IsOptional()
  @IsString()
  client_name?: string;

  @ApiProperty({ description: 'The phone number of the client' })
  @IsNotEmpty()
  @IsString()
  client_phone: string;

  @ApiProperty({ description: 'The email of the client' })
  @IsOptional()
  @IsString()
  client_email?: string;

  @ApiProperty({ description: 'The amount of the deal' })
  @IsNotEmpty()
  @IsNumber()
  deal_amount: number;

  @ApiProperty({ description: 'The amount of the commission' })
  @IsOptional()
  @IsNumber()
  commission_amount?: number;

  @ApiProperty({ description: 'The percentage of the commission' })
  @IsOptional()
  @IsNumber()
  commission_percentage?: number;

  @ApiProperty({ description: 'The date of the deal' })
  @IsNotEmpty()
  @IsDate()
  deal_date: Date;

  @ApiProperty({ description: 'The date of the possession' })
  @IsOptional()
  @IsDate()
  possession_date?: Date;

  @ApiProperty({ description: 'The status of the deal' })
  @IsNotEmpty()
  @IsEnum(DealStatusEnum)
  status: DealStatusEnum;

  @ApiProperty({ description: 'The id of the RM' })
  @IsNotEmpty()
  @IsUUID()
  rm_id: string;
}
