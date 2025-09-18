import { PropertyEntity } from 'src/db/entities/property.entity';
import {
  CreateExtraChargeDto,
  CreateFurnitureDto,
  CreatePricingDto,
  CreatePropertyDto,
} from '../dtos/create-property.dto';
import {
  UpdateExtraChargesDto,
  UpdatePropertyDto,
  UpdatePropertyPricingDataDto,
} from '../dtos/update-property.dto';

export class PropertyMapper {
  static createPropertyDtoToPropertyEntyt(
    createPropertyDto: CreatePropertyDto,
  ) {
    const mappedPropertyData = {
      code: createPropertyDto.code,
      title: createPropertyDto.title,
      listing_for: createPropertyDto.listingFor,
      property_type: createPropertyDto.propertyType,
      property_sub_type: createPropertyDto.propertySubType,
      assign_to: createPropertyDto.assignToId
        ? { id: createPropertyDto.assignToId }
        : undefined,
      source_id: createPropertyDto.sourceId,
      project: createPropertyDto.projectId
        ? { id: createPropertyDto.projectId }
        : undefined,
      builder: createPropertyDto.builderId
        ? { id: createPropertyDto.builderId }
        : undefined,
      key_status: createPropertyDto.keyStatus,
      key_info: createPropertyDto.keyInfo,
      ready_status: createPropertyDto.readyStatus,
      available_from: createPropertyDto.availableFrom
        ? new Date(createPropertyDto.availableFrom)
        : undefined,
      address_line1: createPropertyDto.addressLine1,
      address_line2: createPropertyDto.addressLine2,
      landmark: createPropertyDto.landmark,
      country: createPropertyDto.country,
      state: createPropertyDto.state,
      city: createPropertyDto.city,
      zip_code: createPropertyDto.zipCode,
      tower: createPropertyDto.tower,
      unit_no: createPropertyDto.unitNo,
      floor_no: createPropertyDto.floorNo || 0,
      total_floors: createPropertyDto.totalFloors || 0,
      bhk: createPropertyDto.bhk || 0,
      bathrooms: createPropertyDto.bathrooms || 0,
      balconies: createPropertyDto.balconies || 0,
      other_rooms: createPropertyDto.otherRooms,
      furnishing: createPropertyDto.furnishing,
      ready_to_build_furniture:
        createPropertyDto.readyToBuildFurniture || false,
      pet_allowed: createPropertyDto.petAllowed || false,
      non_veg_allowed: createPropertyDto.nonVegAllowed || false,
      reserved_parkings: createPropertyDto.reservedParkings || false,
      covered_parking_count: createPropertyDto.coveredParkingCount || 0,
      open_parking_count: createPropertyDto.openParkingCount || 0,
      ownership: createPropertyDto.ownership,
      facing: createPropertyDto.facing,
      description: createPropertyDto.description,
      locations: createPropertyDto?.locationIds?.map((id) => ({ id })),
      amenities: createPropertyDto?.amenityIds?.map((id) => ({ id })),
    };

    return mappedPropertyData;
  }

  static createPricingDtoToPricintEntity(pricingData: CreatePricingDto) {
    const mappedPricingData = {
      area_unit: pricingData.areaUnit,
      area: pricingData.area || 0,
      super_build_up_area: pricingData.superBuildUpArea,
      carpet_area: pricingData.carpetArea,
      ppu: pricingData.ppu || 0,
      basic_amount: pricingData.basicAmount || 0,
      brokerage_type: pricingData.brokerageType,
      brokerage_value: pricingData.brokerageValue || 0,
      total_amount: pricingData.totalAmount || 0,
      currency: pricingData.currency || 'INR',
    };

    return mappedPricingData;
  }

  static createExtraChargeDtoToExtraChargeEntity(
    extraChargeData: CreateExtraChargeDto[],
    savedPricingId: string,
  ) {
    const mappedExtraCharges = extraChargeData.map((charge) => ({
      pricing: { id: savedPricingId },
      charge_type: charge.chargeType,
      percentage: charge.percentage || 0,
      per_unit: charge.perUnit || 0,
      amount: charge.amount || 0,
      description: charge.description,
      enabled: charge.enabled !== undefined ? charge.enabled : true,
    }));

    return mappedExtraCharges;
  }

  static createFurnitureDtoToFurnitureEntity(
    furnitureData: CreateFurnitureDto[],
    savedPropertyId: string,
  ) {
    const mappedFurnitures = furnitureData.map((furniture) => ({
      property: { id: savedPropertyId },
      item_name: furniture.item_name,
      quantity: furniture.quantity || 1,
      description: furniture.description,
    }));

    return mappedFurnitures;
  }

  static updatePropertyDtoToPropertyDataEntity(
    updatePropertyDto: UpdatePropertyDto,
    existingProperty: PropertyEntity,
  ) {
    const mappedPropertyData = {
      id: existingProperty.id,
      code:
        updatePropertyDto.code !== undefined
          ? updatePropertyDto.code
          : existingProperty.code,
      title:
        updatePropertyDto.title !== undefined
          ? updatePropertyDto.title
          : existingProperty.title,
      listing_for:
        updatePropertyDto.listingFor !== undefined
          ? updatePropertyDto.listingFor
          : existingProperty.listing_for,
      property_type:
        updatePropertyDto.propertyType !== undefined
          ? updatePropertyDto.propertyType
          : existingProperty.property_type,
      property_sub_type:
        updatePropertyDto.propertySubType !== undefined
          ? updatePropertyDto.propertySubType
          : existingProperty.property_sub_type,
      assign_to:
        updatePropertyDto.assignToId !== undefined
          ? updatePropertyDto.assignToId
            ? { id: updatePropertyDto.assignToId }
            : null
          : existingProperty.assign_to,
      source_id:
        updatePropertyDto.sourceId !== undefined
          ? updatePropertyDto.sourceId
          : existingProperty.source_id,
      project:
        updatePropertyDto.projectId !== undefined
          ? updatePropertyDto.projectId
            ? { id: updatePropertyDto.projectId }
            : null
          : existingProperty.project,
      builder:
        updatePropertyDto.builderId !== undefined
          ? updatePropertyDto.builderId
            ? { id: updatePropertyDto.builderId }
            : null
          : existingProperty.builder,
      key_status:
        updatePropertyDto.keyStatus !== undefined
          ? updatePropertyDto.keyStatus
          : existingProperty.key_status,
      key_info:
        updatePropertyDto.keyInfo !== undefined
          ? updatePropertyDto.keyInfo
          : existingProperty.key_info,
      ready_status:
        updatePropertyDto.readyStatus !== undefined
          ? updatePropertyDto.readyStatus
          : existingProperty.ready_status,
      available_from:
        updatePropertyDto.availableFrom !== undefined
          ? updatePropertyDto.availableFrom
            ? new Date(updatePropertyDto.availableFrom)
            : null
          : existingProperty.available_from,
      address_line1:
        updatePropertyDto.addressLine1 !== undefined
          ? updatePropertyDto.addressLine1
          : existingProperty.address_line1,
      address_line2:
        updatePropertyDto.addressLine2 !== undefined
          ? updatePropertyDto.addressLine2
          : existingProperty.address_line2,
      landmark:
        updatePropertyDto.landmark !== undefined
          ? updatePropertyDto.landmark
          : existingProperty.landmark,
      country:
        updatePropertyDto.country !== undefined
          ? updatePropertyDto.country
          : existingProperty.country,
      state:
        updatePropertyDto.state !== undefined
          ? updatePropertyDto.state
          : existingProperty.state,
      city:
        updatePropertyDto.city !== undefined
          ? updatePropertyDto.city
          : existingProperty.city,
      zip_code:
        updatePropertyDto.zipCode !== undefined
          ? updatePropertyDto.zipCode
          : existingProperty.zip_code,
      tower:
        updatePropertyDto.tower !== undefined
          ? updatePropertyDto.tower
          : existingProperty.tower,
      unit_no:
        updatePropertyDto.unitNo !== undefined
          ? updatePropertyDto.unitNo
          : existingProperty.unit_no,
      floor_no:
        updatePropertyDto.floorNo !== undefined
          ? updatePropertyDto.floorNo
          : existingProperty.floor_no,
      total_floors:
        updatePropertyDto.totalFloors !== undefined
          ? updatePropertyDto.totalFloors
          : existingProperty.total_floors,
      bhk:
        updatePropertyDto.bhk !== undefined
          ? updatePropertyDto.bhk
          : existingProperty.bhk,
      bathrooms:
        updatePropertyDto.bathrooms !== undefined
          ? updatePropertyDto.bathrooms
          : existingProperty.bathrooms,
      balconies:
        updatePropertyDto.balconies !== undefined
          ? updatePropertyDto.balconies
          : existingProperty.balconies,
      other_rooms:
        updatePropertyDto.otherRooms !== undefined
          ? updatePropertyDto.otherRooms
          : existingProperty.other_rooms,
      furnishing:
        updatePropertyDto.furnishing !== undefined
          ? updatePropertyDto.furnishing
          : existingProperty.furnishing,
      ready_to_build_furniture:
        updatePropertyDto.readyToBuildFurniture !== undefined
          ? updatePropertyDto.readyToBuildFurniture
          : existingProperty.ready_to_build_furniture,
      pet_allowed:
        updatePropertyDto.petAllowed !== undefined
          ? updatePropertyDto.petAllowed
          : existingProperty.pet_allowed,
      non_veg_allowed:
        updatePropertyDto.nonVegAllowed !== undefined
          ? updatePropertyDto.nonVegAllowed
          : existingProperty.non_veg_allowed,
      reserved_parkings:
        updatePropertyDto.reservedParkings !== undefined
          ? updatePropertyDto.reservedParkings
          : existingProperty.reserved_parkings,
      covered_parking_count:
        updatePropertyDto.coveredParkingCount !== undefined
          ? updatePropertyDto.coveredParkingCount
          : existingProperty.covered_parking_count,
      open_parking_count:
        updatePropertyDto.openParkingCount !== undefined
          ? updatePropertyDto.openParkingCount
          : existingProperty.open_parking_count,
      ownership:
        updatePropertyDto.ownership !== undefined
          ? updatePropertyDto.ownership
          : existingProperty.ownership,
      facing:
        updatePropertyDto.facing !== undefined
          ? updatePropertyDto.facing
          : existingProperty.facing,
      description:
        updatePropertyDto.description !== undefined
          ? updatePropertyDto.description
          : existingProperty.description,
      locations:
        updatePropertyDto.locationIds !== undefined
          ? updatePropertyDto.locationIds?.map((id) => ({ id }))
          : existingProperty.locations,
      amenities:
        updatePropertyDto.amenityIds !== undefined
          ? updatePropertyDto.amenityIds?.map((id) => ({ id }))
          : existingProperty.amenities,
    };

    return mappedPropertyData;
  }

  static updatePropertyDtoToPricingDataEntity(
    pricingData: UpdatePropertyPricingDataDto,
    existingProperty: PropertyEntity,
  ) {
    const mappedPricingData = {
      id: existingProperty.pricing.id,
      area_unit:
        pricingData.areaUnit !== undefined
          ? pricingData.areaUnit
          : existingProperty.pricing.area_unit,
      area:
        pricingData.area !== undefined
          ? pricingData.area
          : existingProperty.pricing.area,
      super_build_up_area:
        pricingData.superBuildUpArea !== undefined
          ? pricingData.superBuildUpArea
          : existingProperty.pricing.super_build_up_area,
      carpet_area:
        pricingData.carpetArea !== undefined
          ? pricingData.carpetArea
          : existingProperty.pricing.carpet_area,
      ppu:
        pricingData.ppu !== undefined
          ? pricingData.ppu
          : existingProperty.pricing.ppu,
      basic_amount:
        pricingData.basicAmount !== undefined
          ? pricingData.basicAmount
          : existingProperty.pricing.basic_amount,
      brokerage_type:
        pricingData.brokerageType !== undefined
          ? pricingData.brokerageType
          : existingProperty.pricing.brokerage_type,
      brokerage_value:
        pricingData.brokerageValue !== undefined
          ? pricingData.brokerageValue
          : existingProperty.pricing.brokerage_value,
      total_amount:
        pricingData.totalAmount !== undefined
          ? pricingData.totalAmount
          : existingProperty.pricing.total_amount,
      currency:
        pricingData.currency !== undefined
          ? pricingData.currency
          : existingProperty.pricing.currency,
    };

    return mappedPricingData;
  }

  static updatePricingDtoToPricingEntity(
    pricingData: UpdatePropertyPricingDataDto,
    existingProperty: PropertyEntity,
  ) {
    const mappedPricingData = {
      id: existingProperty.pricing.id,
      area_unit:
        pricingData.areaUnit !== undefined
          ? pricingData.areaUnit
          : existingProperty.pricing.area_unit,
      area:
        pricingData.area !== undefined
          ? pricingData.area
          : existingProperty.pricing.area,
      super_build_up_area:
        pricingData.superBuildUpArea !== undefined
          ? pricingData.superBuildUpArea
          : existingProperty.pricing.super_build_up_area,
      carpet_area:
        pricingData.carpetArea !== undefined
          ? pricingData.carpetArea
          : existingProperty.pricing.carpet_area,
      ppu:
        pricingData.ppu !== undefined
          ? pricingData.ppu
          : existingProperty.pricing.ppu,
      basic_amount:
        pricingData.basicAmount !== undefined
          ? pricingData.basicAmount
          : existingProperty.pricing.basic_amount,
      brokerage_type:
        pricingData.brokerageType !== undefined
          ? pricingData.brokerageType
          : existingProperty.pricing.brokerage_type,
      brokerage_value:
        pricingData.brokerageValue !== undefined
          ? pricingData.brokerageValue
          : existingProperty.pricing.brokerage_value,
      total_amount:
        pricingData.totalAmount !== undefined
          ? pricingData.totalAmount
          : existingProperty.pricing.total_amount,
      currency:
        pricingData.currency !== undefined
          ? pricingData.currency
          : existingProperty.pricing.currency,
    };

    return mappedPricingData;
  }

  static updateExtraChargeDtoToExtraChargeEntity(
    extraChargeData: UpdateExtraChargesDto[],
    savedPricingId: string,
  ) {
    const mappedExtraCharges = extraChargeData.map((charge) => ({
      pricing: { id: savedPricingId },
      charge_type: charge.chargeType,
      percentage: charge.percentage || 0,
      per_unit: charge.perUnit || 0,
      amount: charge.amount || 0,
      description: charge.description,
      enabled: charge.enabled !== undefined ? charge.enabled : true,
    }));

    return mappedExtraCharges;
  }
}
