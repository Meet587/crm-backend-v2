import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import {
  PropertyStatusEnum,
  PropertyTypeEnum,
  SizeUnitEnum,
} from '../../db/entities/property.entity';

export class CreatePropertyDto {
  @ApiProperty({
    description: 'The project id',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsNotEmpty()
  @IsUUID()
  project_id: string;

  @ApiProperty({
    description: 'The property number',
    example: '101',
  })
  @IsOptional()
  @IsString()
  property_number?: string;

  @ApiProperty({
    description: 'The size of the property',
    example: 1000,
  })
  @IsNumber()
  @IsOptional()
  size?: number;

  @ApiProperty({
    description: 'The size unit of the property',
    example: SizeUnitEnum.SQFT,
  })
  @IsOptional()
  @IsEnum(SizeUnitEnum)
  size_unit?: SizeUnitEnum;

  @ApiProperty({
    description: 'The number of bedrooms',
    example: 2,
  })
  @IsOptional()
  @IsNumber()
  bedrooms?: number;

  @ApiProperty({
    description: 'The number of bathrooms',
    example: 2,
  })
  @IsOptional()
  @IsNumber()
  bathrooms?: number;

  @ApiProperty({
    description: 'The floor number',
    example: 1,
  })
  @IsOptional()
  @IsNumber()
  floor_number?: number;

  @ApiProperty({
    description: 'The price of the property',
    example: 1000000,
  })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({
    description: 'The status of the property',
    example: PropertyStatusEnum.AVAILABLE,
  })
  @IsNotEmpty()
  @IsEnum(PropertyStatusEnum)
  status: PropertyStatusEnum;

  @ApiProperty({
    description: 'The type of the property',
    example: PropertyTypeEnum.FLAT,
  })
  @IsNotEmpty()
  @IsEnum(PropertyTypeEnum)
  property_type: PropertyTypeEnum;
}
