import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';
import {
  AreaUnitEnum,
  PropertySubtypeEnum,
} from '../../db/entities/project.enums';

export class CreateCommercialUnitDto {
  @ApiProperty({
    description: 'The project ID of the commercial unit',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  @IsNotEmpty()
  project_id: string;

  @ApiProperty({
    description: 'The subtype of the commercial unit',
    enum: PropertySubtypeEnum,
    example: PropertySubtypeEnum.SHOP_SHOWROOM,
  })
  @IsEnum(PropertySubtypeEnum)
  @IsNotEmpty()
  subtype: PropertySubtypeEnum;

  @ApiProperty({
    description: 'The starting floor of the commercial unit',
    example: 1,
    minimum: 0,
  })
  @IsInt()
  @Min(0)
  @IsOptional()
  floor_start?: number;

  @ApiProperty({
    description: 'The ending floor of the commercial unit',
    example: 10,
    minimum: 0,
  })
  @IsInt()
  @Min(0)
  @IsOptional()
  floor_end?: number;

  @ApiProperty({
    description: 'The unit type of the commercial unit',
    example: 'Shop',
  })
  @IsString()
  @IsNotEmpty()
  unit_type: string;

  @ApiProperty({
    description:
      'The super build-up area of the commercial unit in square feet',
    example: 1000.5,
  })
  @IsNumber()
  @IsNotEmpty()
  super_build_up_area_sqFt: number;

  @ApiProperty({
    description: 'The carpet area of the commercial unit in square feet',
    example: 800.75,
  })
  @IsNumber()
  @IsNotEmpty()
  carpet_area_sqFt: number;

  @ApiProperty({
    description: 'The basic cost of the commercial unit',
    example: 5000000.0,
  })
  @IsNumber()
  @IsOptional()
  basic_cost?: number;

  @ApiProperty({
    description: 'The total cost of the commercial unit',
    example: 5500000.0,
  })
  @IsNumber()
  @IsOptional()
  total_cost?: number;

  @ApiProperty({
    description: 'The floor plan URL of the commercial unit',
    example: 'https://example.com/floor-plan.jpg',
  })
  @IsString()
  @IsOptional()
  floor_plan_url?: string;

  @ApiProperty({
    description: 'The area unit used for the commercial unit',
    enum: AreaUnitEnum,
    default: AreaUnitEnum.SQFT,
  })
  @IsEnum(AreaUnitEnum)
  @IsOptional()
  inserted_area_unit?: AreaUnitEnum;
}
