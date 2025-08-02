import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
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
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  @IsNotEmpty()
  builder_id: string;

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
    example: ['123e4567-e89b-12d3-a456-426614174000'],
  })
  @IsArray()
  @IsUUID('4', { each: true })
  @IsOptional()
  location_ids?: string[];

  @ApiProperty({
    description: 'The amenities IDs of the project',
    isArray: true,
    example: ['123e4567-e89b-12d3-a456-426614174000'],
  })
  @IsArray()
  @IsUUID('4', { each: true })
  @IsOptional()
  amenities_ids?: string[];

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
