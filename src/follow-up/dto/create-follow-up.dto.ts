import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';
import { FollowUpStatusEnum, FollowUpTypeEnum } from '../../db/entities/follow-up.entity';


export class CreateFollowUpDto {
  @ApiProperty({
    description: 'The ID of the lead associated with the follow-up',
    required: false,
  })
  @IsOptional()
  @IsString()
  lead_id?: string;

  @ApiProperty({
    description: 'The ID of the client associated with the follow-up',
    required: false,
  })
  @IsOptional()
  @IsString()
  client_id?: string;

  @ApiProperty({ description: 'The ID of the agent conducting the follow-up' })
  @IsString()
  agent_id: string;

  @ApiProperty({ description: 'The type of follow-up', enum: FollowUpTypeEnum })
  @IsEnum(FollowUpTypeEnum)
  type: FollowUpTypeEnum;

  @ApiProperty({
    description: 'The date and time of the follow-up',
    type: 'string',
    format: 'date-time',
  })
  @IsDateString()
  follow_up_date: Date;

  @ApiProperty({
    description: 'The status of the follow-up',
    enum: FollowUpStatusEnum,
    default: FollowUpStatusEnum.PENDING,
    required: false,
  })
  @IsOptional()
  @IsEnum(FollowUpStatusEnum)
  status?: FollowUpStatusEnum;

  @ApiProperty({ description: 'The purpose of the follow-up' })
  @IsString()
  purpose: string;

  @ApiProperty({ description: 'The outcome of the follow-up', required: false })
  @IsOptional()
  @IsString()
  outcome?: string;

  @ApiProperty({
    description: 'The date and time of the next follow-up',
    type: 'string',
    format: 'date-time',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  next_follow_up_date?: Date;

  @ApiProperty({
    description: 'Additional notes about the follow-up',
    required: false,
  })
  @IsOptional()
  @IsString()
  notes?: string;
}
