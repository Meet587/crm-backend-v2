import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateUnitFloorPlanDto {
  @ApiProperty({
    description: 'The name of the floor plan',
    example: 'Master Plan',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'The image URL of the floor plan',
    example: 'https://example.com/floor-plan.jpg',
  })
  @IsString()
  @IsNotEmpty()
  image_url: string;

  @ApiProperty({
    description: 'The description of the floor plan',
    example: 'Detailed layout of the unit',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'The residential unit ID of the floor plan',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  @IsOptional()
  residential_unit_id?: string;

  @ApiProperty({
    description: 'The commercial unit ID of the floor plan',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  @IsOptional()
  commercial_unit_id?: string;

  @ApiProperty({
    description: 'The land plot ID of the floor plan',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  @IsOptional()
  land_plot_id?: string;
}