import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEnum, IsOptional, IsString } from 'class-validator';
import { ActivityStatusEnum } from '../../db/entities/lead-activity.entity';

export class UpdateActivityDto {
  @ApiProperty({ required: false, type: String })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({ required: false, type: String })
  @IsString()
  @IsOptional()
  master_comment: string;

  @ApiProperty({ required: false, type: Date })
  @IsDate()
  @IsOptional()
  scheduled_at: Date;

  @ApiProperty({ required: false, type: Date })
  @IsDate()
  @IsOptional()
  completed_at: Date;

  @ApiProperty({ required: false, enum: ActivityStatusEnum })
  @IsEnum(ActivityStatusEnum)
  @IsOptional()
  status: ActivityStatusEnum;
}
