import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import {
  ActivityStatusEnum,
  ActivityTypeEnum,
} from '../../db/entities/lead-activity.entity';

export class CreateActivityDto {
  @ApiProperty({ enum: ActivityTypeEnum })
  @IsEnum(ActivityTypeEnum)
  @IsNotEmpty()
  activity_type: ActivityTypeEnum;

  @ApiProperty({ required: false })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ required: false, type: String })
  @IsString()
  @IsNotEmpty()
  master_comment: string;

  @ApiProperty({ required: false, type: Date })
  @IsDate()
  @IsNotEmpty()
  scheduled_at: Date;

  @ApiProperty({ required: false, type: Date })
  @IsDate()
  @IsNotEmpty()
  completed_at: Date;

  @ApiProperty({ required: false, type: String })
  @IsString()
  @IsNotEmpty()
  created_by: string;

  @ApiProperty({ enum: ActivityStatusEnum, required: false })
  @IsEnum(ActivityStatusEnum)
  @IsNotEmpty()
  status: ActivityStatusEnum;
}
