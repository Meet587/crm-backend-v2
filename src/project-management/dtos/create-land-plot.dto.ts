import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { AreaUnit, PropertySubtypeEnum } from '../../db/entities/project.enums';

export class CreateLandPlotDto {
  @ApiProperty({
    description: 'The project ID of the land plot',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  @IsNotEmpty()
  project_id: string;

  @ApiProperty({
    description: 'The subtype of the land plot',
    enum: PropertySubtypeEnum,
    example: PropertySubtypeEnum.LAND_PLOT,
  })
  @IsEnum(PropertySubtypeEnum)
  @IsNotEmpty()
  subtype: PropertySubtypeEnum;

  @ApiProperty({
    description: 'The unit type of the land plot',
    example: 'Residential Plot',
  })
  @IsString()
  @IsNotEmpty()
  unit_type: string;

  @ApiProperty({
    description: 'The super build-up area of the land plot in square feet',
    example: 5000.5,
  })
  @IsNumber()
  @IsNotEmpty()
  super_build_up_area_sqFt: number;

  @ApiProperty({
    description: 'The carpet area of the land plot in square feet',
    example: 4800.75,
  })
  @IsNumber()
  @IsNotEmpty()
  carpet_area_sqFt: number;

  @ApiProperty({
    description: 'The basic cost of the land plot',
    example: 10000000.0,
  })
  @IsNumber()
  @IsOptional()
  basic_cost?: number;

  @ApiProperty({
    description: 'The total cost of the land plot',
    example: 11000000.0,
  })
  @IsNumber()
  @IsOptional()
  total_cost?: number;

  @ApiProperty({
    description: 'The floor plan URL of the land plot',
    example: 'https://example.com/plot-plan.jpg',
  })
  @IsString()
  @IsOptional()
  floor_plan_url?: string;

  @ApiProperty({
    description: 'The area unit used for the land plot',
    enum: AreaUnit,
    default: AreaUnit.SQFT,
  })
  @IsEnum(AreaUnit)
  @IsOptional()
  inserted_area_unit?: AreaUnit;
}
