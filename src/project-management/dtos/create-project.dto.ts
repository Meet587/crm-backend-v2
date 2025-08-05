import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import {
  ConstructionType,
  PropertySubtypeEnum,
  PropertyTypeEnum,
} from '../../db/entities/project.enums';

export class CreateProjectDto {
  @ApiProperty({
    description: 'The name of the project',
    example: 'Project 1',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'The description of the project',
    example: 'Project 1 description',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'The builder ID of the project',
    example: '1',
  })
  @IsNumber()
  @IsNotEmpty()
  builder_id: number;

  @ApiProperty({
    description: 'The construction type of the project',
    enum: ConstructionType,
    default: ConstructionType.NEW,
  })
  @IsEnum(ConstructionType)
  @IsOptional()
  construction_type?: ConstructionType;

  @ApiProperty({
    description: 'The property types of the project',
    enum: PropertyTypeEnum,
    isArray: true,
    example: [PropertyTypeEnum.RESIDENTIAL],
  })
  @IsArray()
  @IsEnum(PropertyTypeEnum, { each: true })
  @IsOptional()
  property_types?: PropertyTypeEnum[];

  @ApiProperty({
    description: 'The property subtypes of the project',
    enum: PropertySubtypeEnum,
    isArray: true,
    example: [PropertySubtypeEnum.APARTMENT_FLAT],
  })
  @IsArray()
  @IsEnum(PropertySubtypeEnum, { each: true })
  @IsOptional()
  property_subtypes?: PropertySubtypeEnum[];

  @ApiProperty({
    description: 'The construction year of the project',
    example: '2023',
  })
  @IsString()
  @IsOptional()
  construction_year?: string;

  @ApiProperty({
    description: 'The possession month of the project (1-12)',
    example: 6,
    minimum: 1,
    maximum: 12,
  })
  @IsInt()
  @Min(1)
  @Max(12)
  @IsOptional()
  possession_month?: number;

  @ApiProperty({
    description: 'The possession year of the project',
    example: 2024,
  })
  @IsInt()
  @IsOptional()
  possession_year?: number;

  @ApiProperty({
    description: 'Whether the project is ready for possession',
    example: false,
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  is_ready_possession?: boolean;

  @ApiProperty({
    description: 'The location IDs of the project',
    isArray: true,
    example: ['1', '2'],
  })
  @IsArray()
  @IsNumber()
  @IsOptional()
  location_ids?: number[];

  @ApiProperty({
    description: 'The amenities IDs of the project',
    isArray: true,
    example: ['1', '2'],
  })
  @IsArray()
  @IsNumber()
  @IsOptional()
  amenities_ids?: number[];

  @ApiProperty({
    description: 'The brochure URL of the project',
    example: 'https://example.com/brochure.pdf',
  })
  @IsString()
  @IsOptional()
  brochure_url?: string;

  @ApiProperty({
    description: 'The website URL of the project',
    example: 'https://example.com',
  })
  @IsString()
  @IsOptional()
  website_url?: string;

  @ApiProperty({
    description: 'The main image URL of the project',
    example: 'https://example.com/image.jpg',
  })
  @IsString()
  @IsOptional()
  main_image_url?: string;

  @ApiProperty({
    description: 'The address line 1 of the project',
    example: '123 Main St',
  })
  @IsString()
  @IsOptional()
  address_line1?: string;

  @ApiProperty({
    description: 'The address line 2 of the project',
    example: 'Suite 100',
  })
  @IsString()
  @IsOptional()
  address_line2?: string;

  @ApiProperty({
    description: 'The RERA number of the project',
    example: 'RERA123456',
  })
  @IsString()
  @IsNotEmpty()
  rera_number: string;

  @ApiProperty({
    description: 'The GST number of the project',
    example: 'GST123456',
  })
  @IsString()
  @IsNotEmpty()
  gst_number: string;
}
