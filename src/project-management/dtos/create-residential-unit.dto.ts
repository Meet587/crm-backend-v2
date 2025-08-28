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
  PropertyUnitTypeEnum,
} from '../../db/entities/project.enums';

export class CreateResidentialUnitDto {
  @ApiProperty({
    description: 'The project ID of the residential unit',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  @IsNotEmpty()
  project_id: string;

  @ApiProperty({
    description: 'The subtype of the residential unit',
    enum: PropertySubtypeEnum,
    example: PropertySubtypeEnum.APARTMENT_FLAT,
  })
  @IsEnum(PropertySubtypeEnum)
  @IsNotEmpty()
  subtype: PropertySubtypeEnum;

  @ApiProperty({
    description: 'The starting floor of the residential unit',
    example: 1,
    minimum: 0,
  })
  @IsInt()
  @Min(0)
  @IsOptional()
  floor_start?: number;

  @ApiProperty({
    description: 'The ending floor of the residential unit',
    example: 10,
    minimum: 0,
  })
  @IsInt()
  @Min(0)
  @IsOptional()
  floor_end?: number;

  @ApiProperty({
    description: 'The unit type of the residential unit',
    enum: PropertyUnitTypeEnum,
    example: PropertyUnitTypeEnum.BHK2,
  })
  @IsEnum(PropertyUnitTypeEnum)
  @IsNotEmpty()
  unit_type: PropertyUnitTypeEnum;

  @ApiProperty({
    description: 'The number of bedrooms in the residential unit',
    example: 2,
    minimum: 0,
  })
  @IsInt()
  @Min(0)
  @IsNotEmpty()
  bedrooms: number;

  @ApiProperty({
    description: 'The number of bathrooms in the residential unit',
    example: 2,
    minimum: 0,
  })
  @IsInt()
  @Min(0)
  @IsNotEmpty()
  bathrooms: number;

  @ApiProperty({
    description:
      'The super build-up area of the residential unit in square feet',
    example: 1000.5,
  })
  @IsNumber()
  @IsNotEmpty()
  super_build_up_area_sqFt: number;

  @ApiProperty({
    description: 'The carpet area of the residential unit in square feet',
    example: 800.75,
  })
  @IsNumber()
  @IsNotEmpty()
  carpet_area_sqFt: number;

  @ApiProperty({
    description: 'The basic cost of the residential unit',
    example: 5000000.0,
  })
  @IsNumber()
  @IsOptional()
  basic_cost?: number;

  @ApiProperty({
    description: 'The total cost of the residential unit',
    example: 5500000.0,
  })
  @IsNumber()
  @IsOptional()
  total_cost?: number;

  @ApiProperty({
    description: 'The floor plan URL of the residential unit',
    example: 'https://example.com/floor-plan.jpg',
  })
  @IsString()
  @IsOptional()
  floor_plan_url?: string;

  @ApiProperty({
    description: 'The area unit used for the residential unit',
    enum: AreaUnitEnum,
    default: AreaUnitEnum.SQFT,
  })
  @IsEnum(AreaUnitEnum)
  @IsOptional()
  inserted_area_unit?: AreaUnitEnum;
}
