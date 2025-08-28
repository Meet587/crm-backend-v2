import { PartialType } from '@nestjs/swagger';
import {
  CreateExtraChargeDto,
  CreateFurnitureDto,
  CreatePricingDto,
  CreatePropertyDto,
} from './create-property.dto';

export class UpdatePropertyDto extends PartialType(CreatePropertyDto) {}

export class UpdatePropertyPricingDataDto extends PartialType(
  CreatePricingDto,
) {}

export class UpdateFurnitureDto extends PartialType(CreateFurnitureDto) {}

export class UpdateExtraChargesDto extends PartialType(CreateExtraChargeDto) {}
