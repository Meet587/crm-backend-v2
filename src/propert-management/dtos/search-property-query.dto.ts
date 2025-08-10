import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { PropertyTypeEnum } from 'src/db/entities/project.enums';
import { ListingForEnum } from 'src/db/entities/property.entity';

export class SearchPropertyQueryDto {
  @ApiPropertyOptional({
    enum: PropertyTypeEnum,
    description: 'Type of property to search for',
    example: PropertyTypeEnum.RESIDENTIAL,
  })
  @IsOptional()
  @IsEnum(PropertyTypeEnum)
  propertyType?: PropertyTypeEnum;

  @ApiPropertyOptional({
    enum: ListingForEnum,
    description: 'Whether property is for sale or rent',
    example: ListingForEnum.SALE,
  })
  @IsOptional()
  @IsEnum(ListingForEnum)
  listingFor?: ListingForEnum;

  @ApiPropertyOptional({
    description: 'City name to search properties in',
    example: 'Mumbai',
  })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiPropertyOptional({
    description: 'Number of bedrooms (BHK)',
    example: 2,
    minimum: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  bhk?: number;

  @ApiPropertyOptional({
    description: 'Minimum price range',
    example: 1000000,
    minimum: 0,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  minPrice?: number;

  @ApiPropertyOptional({
    description: 'Maximum price range',
    example: 5000000,
    minimum: 0,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  maxPrice?: number;
}
