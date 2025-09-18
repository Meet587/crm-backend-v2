import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import {
  PropertySubtypeEnum,
  PropertyTypeEnum,
} from 'src/db/entities/project.enums';
import {
  FurnishingEnum,
  ListingForEnum,
} from 'src/db/entities/property.entity';
import { PaginationDto } from 'src/helpers/pagination.dto';

export class SearchPropertyQueryDto extends PaginationDto {
  @ApiPropertyOptional({
    enum: PropertyTypeEnum,
    description: 'Type of property to search for',
  })
  @IsOptional()
  @IsEnum(PropertyTypeEnum)
  propertyType?: PropertyTypeEnum;

  @ApiPropertyOptional({
    description: 'Property title',
    example: '3BHK Luxury Apartment in Downtown',
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({
    description: 'Property subtype',
    enum: PropertySubtypeEnum,
  })
  @IsOptional()
  @IsEnum(PropertySubtypeEnum)
  propertySubType?: PropertySubtypeEnum;

  @ApiPropertyOptional({
    description: 'Furnishing status',
    enum: FurnishingEnum,
  })
  @IsOptional()
  @IsEnum(FurnishingEnum)
  furnishing?: FurnishingEnum;

  @ApiPropertyOptional({
    enum: ListingForEnum,
    description: 'Whether property is for sale or rent',
  })
  @IsOptional()
  @IsEnum(ListingForEnum)
  listingFor?: ListingForEnum;

  @ApiPropertyOptional({
    description: 'City name to search properties in',
  })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiPropertyOptional({
    description: 'Number of bedrooms (BHK)',
    minimum: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  bhk?: number;

  @ApiPropertyOptional({
    description: 'Minimum price range',
    minimum: 0,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  minPrice?: number;

  @ApiPropertyOptional({
    description: 'Maximum price range',
    minimum: 0,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  maxPrice?: number;
}
