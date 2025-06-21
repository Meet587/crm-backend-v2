import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';
import {
  InterestLevel,
  SiteVisitStatusEnum,
} from '../../db/entities/site-visit.entity';

export class CreateSiteVisitDto {
  @ApiProperty({
    description: 'The ID of the lead associated with the site visit',
    required: false,
  })
  @IsOptional()
  @IsString()
  lead_id?: string;

  @ApiProperty({
    description: 'The ID of the client associated with the site visit',
    required: false,
  })
  @IsOptional()
  @IsString()
  client_id?: string;

  @ApiProperty({ description: 'The ID of the property visited' })
  @IsString()
  property_id: string;

  @ApiProperty({ description: 'The ID of the agent conducting the site visit' })
  @IsString()
  agent_id: string;

  @ApiProperty({
    description: 'The date and time of the site visit',
    type: 'string',
    format: 'date-time',
  })
  @IsDateString()
  visit_date: Date;

  @ApiProperty({
    description: 'The status of the site visit',
    enum: SiteVisitStatusEnum,
    default: SiteVisitStatusEnum.SCHEDULED,
    required: false,
  })
  @IsOptional()
  @IsEnum(SiteVisitStatusEnum)
  status?: SiteVisitStatusEnum;

  @ApiProperty({ description: 'Feedback from the site visit', required: false })
  @IsOptional()
  @IsString()
  feedback?: string;

  @ApiProperty({
    description: "The client's interest level in the property",
    enum: InterestLevel,
    required: false,
  })
  @IsOptional()
  @IsEnum(InterestLevel)
  interest_level?: InterestLevel;

  @ApiProperty({
    description: 'Additional notes about the site visit',
    required: false,
  })
  @IsOptional()
  @IsString()
  notes?: string;
}
