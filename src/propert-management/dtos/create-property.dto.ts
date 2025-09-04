import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
  ValidateNested,
} from 'class-validator';
import {
  AreaUnitEnum,
  PropertySubtypeEnum,
  PropertyTypeEnum,
} from '../../db/entities/project.enums';
import { PropertyExtraChargeType } from '../../db/entities/property-extra-charge.entity';
import { BrokerageTypeEnum } from '../../db/entities/property-pricing.entity';
import {
  FurnishingEnum,
  ListingForEnum,
  OtherRoomsTypeEnum,
  PropertyFacingEnum,
  PropertyOwnerShipEnum,
  ReadyStatusEnum,
} from '../../db/entities/property.entity';

export class CreateFurnitureDto {
  @ApiProperty({
    description: 'Furniture item name',
    example: 'Sofa Set',
  })
  @IsString()
  item_name: string;

  @ApiPropertyOptional({
    description: 'Quantity of the item',
    example: 1,
    minimum: 1,
    default: 1,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  quantity?: number;

  @ApiPropertyOptional({
    description: 'Description of the furniture item',
    example: '3-seater leather sofa with cushions',
  })
  @IsOptional()
  @IsString()
  description?: string;
}

export class CreateExtraChargeDto {
  @ApiPropertyOptional({
    description: 'Type of charge',
    example: PropertyExtraChargeType.MAINTENANCE,
    enum: PropertyExtraChargeType,
    default: PropertyExtraChargeType.MAINTENANCE,
  })
  @IsOptional()
  @IsEnum(PropertyExtraChargeType)
  chargeType?: PropertyExtraChargeType;

  @ApiPropertyOptional({
    description: 'Percentage value',
    example: 5.5,
    minimum: 0,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  percentage?: number;

  @ApiPropertyOptional({
    description: 'Per unit charge',
    example: 100,
    minimum: 0,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  perUnit?: number;

  @ApiPropertyOptional({
    description: 'Fixed amount',
    example: 50000,
    minimum: 0,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  amount?: number;

  @ApiPropertyOptional({
    description: 'Additional description for the charge',
    example: 'Monthly maintenance fee',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    description: 'Whether the charge is enabled',
    example: true,
    default: true,
  })
  @IsOptional()
  @IsBoolean()
  enabled?: boolean;
}

export class CreatePricingDto {
  @ApiPropertyOptional({
    description: 'Area unit',
    enum: AreaUnitEnum,
    example: AreaUnitEnum.SQFT,
  })
  @IsOptional()
  @IsEnum(AreaUnitEnum)
  areaUnit?: AreaUnitEnum;

  @ApiPropertyOptional({
    description: 'Property area',
    example: 1200.5,
    minimum: 0,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  area?: number;

  @ApiPropertyOptional({
    description: 'Super built-up area',
    example: 1350.75,
  })
  @IsOptional()
  @IsString()
  superBuildUpArea?: string;

  @ApiPropertyOptional({
    description: 'Carpet area',
    example: 1000.25,
    minimum: 0,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  carpetArea?: number;

  @ApiPropertyOptional({
    description: 'Price per unit',
    example: 5000,
    minimum: 0,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  ppu?: number;

  @ApiPropertyOptional({
    description: 'Basic amount',
    example: 6000000,
    minimum: 0,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  basicAmount?: number;

  @ApiPropertyOptional({
    description: 'Brokerage type',
    enum: BrokerageTypeEnum,
    example: BrokerageTypeEnum.PERCENT,
  })
  @IsOptional()
  @IsEnum(BrokerageTypeEnum)
  brokerageType?: BrokerageTypeEnum;

  @ApiPropertyOptional({
    description: 'Brokerage value',
    example: 2.5,
    minimum: 0,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  brokerageValue?: number;

  @ApiPropertyOptional({
    description: 'Total amount',
    example: 6150000,
    minimum: 0,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  totalAmount?: number;

  @ApiPropertyOptional({
    description: 'Currency',
    example: 'INR',
    default: 'INR',
  })
  @IsOptional()
  @IsString()
  currency?: string;

  @ApiPropertyOptional({
    description: 'Extra charges',
    type: [CreateExtraChargeDto],
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateExtraChargeDto)
  extraCharges?: CreateExtraChargeDto[];
}

export class CreatePropertyDto {
  @ApiPropertyOptional({
    description: 'Property code/identifier',
    example: 'PROP-001',
  })
  @IsOptional()
  @IsString()
  code?: string;

  @ApiProperty({
    description: 'Property title',
    example: '3BHK Luxury Apartment in Downtown',
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Property listing type',
    enum: ListingForEnum,
    example: ListingForEnum.SALE,
  })
  @IsEnum(ListingForEnum)
  listingFor: ListingForEnum;

  @ApiProperty({
    description: 'Property type',
    enum: PropertyTypeEnum,
    example: PropertyTypeEnum.RESIDENTIAL,
  })
  @IsEnum(PropertyTypeEnum)
  propertyType: PropertyTypeEnum;

  @ApiProperty({
    description: 'Property subtype',
    enum: PropertySubtypeEnum,
    example: PropertySubtypeEnum.APARTMENT_FLAT,
  })
  @IsEnum(PropertySubtypeEnum)
  propertySubType: PropertySubtypeEnum;

  @ApiPropertyOptional({
    description: 'User ID to assign this property to',
    format: 'uuid',
  })
  @IsOptional()
  @IsUUID()
  assignToId?: string;

  @ApiPropertyOptional({
    description: 'Source ID for the property',
    format: 'uuid',
  })
  @IsOptional()
  @IsUUID()
  sourceId?: string;

  @ApiPropertyOptional({
    description: 'Project ID associated with this property',
    format: 'uuid',
  })
  @IsOptional()
  @IsUUID()
  projectId?: string;

  @ApiPropertyOptional({
    description: 'Builder ID associated with this property',
    example: 1,
  })
  @IsOptional()
  @IsNumber()
  builderId?: number;

  @ApiPropertyOptional({
    description: 'Key status information',
    example: 'Available',
  })
  @IsOptional()
  @IsString()
  keyStatus?: string;

  @ApiPropertyOptional({
    description: 'Additional key information',
    example: 'Keys with security',
  })
  @IsOptional()
  @IsString()
  keyInfo?: string;

  @ApiPropertyOptional({
    description: 'Property ready status',
    enum: ReadyStatusEnum,
    example: ReadyStatusEnum.READY_TO_MOVE,
  })
  @IsOptional()
  @IsEnum(ReadyStatusEnum)
  readyStatus?: ReadyStatusEnum;

  @ApiPropertyOptional({
    description: 'Date when property is available from',
    format: 'date',
    example: '2024-01-01',
  })
  @IsOptional()
  @IsDateString()
  availableFrom?: string;

  @ApiPropertyOptional({
    description: 'Address line 1',
    example: '123 Main Street',
  })
  @IsOptional()
  @IsString()
  addressLine1?: string;

  @ApiPropertyOptional({
    description: 'Address line 2',
    example: 'Apartment 4B',
  })
  @IsOptional()
  @IsString()
  addressLine2?: string;

  @ApiPropertyOptional({
    description: 'Landmark near the property',
    example: 'Near Central Mall',
  })
  @IsOptional()
  @IsString()
  landmark?: string;

  @ApiPropertyOptional({
    description: 'Country',
    example: 'India',
  })
  @IsOptional()
  @IsString()
  country?: string;

  @ApiPropertyOptional({
    description: 'State',
    example: 'Maharashtra',
  })
  @IsOptional()
  @IsString()
  state?: string;

  @ApiPropertyOptional({
    description: 'City',
    example: 'Mumbai',
  })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiPropertyOptional({
    description: 'ZIP/Postal code',
    example: '400001',
  })
  @IsOptional()
  @IsString()
  zipCode?: string;

  @ApiPropertyOptional({
    description: 'Tower name/number',
    example: 'Tower A',
  })
  @IsOptional()
  @IsString()
  tower?: string;

  @ApiPropertyOptional({
    description: 'Unit number',
    example: '4B',
  })
  @IsOptional()
  @IsString()
  unitNo?: string;

  @ApiPropertyOptional({
    description: 'Floor number',
    example: 4,
    minimum: 0,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  floorNo?: number;

  @ApiPropertyOptional({
    description: 'Total floors in the building',
    example: 20,
    minimum: 0,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  totalFloors?: number;

  @ApiPropertyOptional({
    description: 'Number of bedrooms (BHK)',
    example: 3,
    minimum: 0,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  bhk?: number;

  @ApiPropertyOptional({
    description: 'Number of bathrooms',
    example: 2,
    minimum: 0,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  bathrooms?: number;

  @ApiPropertyOptional({
    description: 'Number of balconies',
    example: 1,
    minimum: 0,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  balconies?: number;

  @ApiPropertyOptional({
    description: 'Other room types available',
    enum: OtherRoomsTypeEnum,
    isArray: true,
    example: [OtherRoomsTypeEnum.STUDY, OtherRoomsTypeEnum.STORE],
  })
  @IsOptional()
  @IsArray()
  @IsEnum(OtherRoomsTypeEnum, { each: true })
  otherRooms?: OtherRoomsTypeEnum[];

  @ApiPropertyOptional({
    description: 'Furnishing status',
    enum: FurnishingEnum,
    example: FurnishingEnum.SEMIFURNISHED,
  })
  @IsOptional()
  @IsEnum(FurnishingEnum)
  furnishing?: FurnishingEnum;

  @ApiPropertyOptional({
    description: 'Ready to build furniture',
    example: false,
  })
  @IsOptional()
  @IsBoolean()
  readyToBuildFurniture?: boolean;

  @ApiPropertyOptional({
    description: 'Pet allowed',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  petAllowed?: boolean;

  @ApiPropertyOptional({
    description: 'Non-vegetarian food allowed',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  nonVegAllowed?: boolean;

  @ApiPropertyOptional({
    description: 'Reserved parking available',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  reservedParkings?: boolean;

  @ApiPropertyOptional({
    description: 'Number of covered parking spaces',
    example: 1,
    minimum: 0,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  coveredParkingCount?: number;

  @ApiPropertyOptional({
    description: 'Number of open parking spaces',
    example: 1,
    minimum: 0,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  openParkingCount?: number;

  @ApiPropertyOptional({
    description: 'Property ownership type',
    enum: PropertyOwnerShipEnum,
    example: PropertyOwnerShipEnum.FREEHOLD,
  })
  @IsOptional()
  @IsEnum(PropertyOwnerShipEnum)
  ownership?: PropertyOwnerShipEnum;

  @ApiPropertyOptional({
    description: 'Property facing direction',
    enum: PropertyFacingEnum,
    example: PropertyFacingEnum.NORTH,
  })
  @IsOptional()
  @IsEnum(PropertyFacingEnum)
  facing?: PropertyFacingEnum;

  @ApiPropertyOptional({
    description: 'Property description',
    example: 'Beautiful 3BHK apartment with modern amenities',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    description: 'Location IDs associated with this property',
    type: [Number],
    example: [1, 2, 3],
  })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  locationIds?: number[];

  @ApiPropertyOptional({
    description: 'Amenity IDs associated with this property',
    type: [Number],
    example: [1, 2, 3],
  })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  amenityIds?: number[];

  @ApiPropertyOptional({
    description: 'Furniture details',
    type: [CreateFurnitureDto],
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateFurnitureDto)
  furnitures?: CreateFurnitureDto[];

  @ApiPropertyOptional({
    description: 'Pricing information',
    type: CreatePricingDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => CreatePricingDto)
  pricing?: CreatePricingDto;
}
