import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PropertyPricingEntity } from 'src/db/entities/property-pricing.entity';
import { PropertyExtraChargeRepositoryInterface } from 'src/db/interfaces/property-extra-charge.interface';
import { PropertyFurnitureRepositoryInterface } from 'src/db/interfaces/property-furniture.interface';
import { PropertyPricingRepositoryInterface } from 'src/db/interfaces/property-pricing.interface';
import { PropertyUploadRepositoryInterface } from 'src/db/interfaces/property-upload.interface';
import { PropertyRepositoryInterface } from '../db/interfaces/property.interface';
import { CreateFurnitureDto, CreatePropertyDto } from './dtos/create-property.dto';
import { SearchPropertyQueryDto } from './dtos/search-property-query.dto';
import { UpdateExtraChargesDto, UpdateFurnitureDto, UpdatePropertyDto, UpdatePropertyPricingDataDto } from './dtos/update-property.dto';
import { PropertyMapper } from './mapper/property.mapper';

@Injectable()
export class PropertyManagementService {
  constructor(
    @Inject('propertyRepositoryInterface')
    private readonly propertyRepository: PropertyRepositoryInterface,

    @Inject('propertyExtraChargeRepositoryInterface')
    private readonly extraChargeRepository: PropertyExtraChargeRepositoryInterface,

    @Inject('propertyFurnitureRepositoryInterface')
    private readonly furnitureRepository: PropertyFurnitureRepositoryInterface,

    @Inject('propertyPricingRepositoryInterface')
    private readonly pricingRepository: PropertyPricingRepositoryInterface,

    @Inject('propertyUploadRepositoryInterface')
    private readonly uploadRepository: PropertyUploadRepositoryInterface,
  ) {}

  async createProperty(createPropertyDto: CreatePropertyDto) {
    try {
      const { pricing, furnitures } = createPropertyDto;

      const mappedPropertyData =
        PropertyMapper.createPropertyDtoToPropertyEntyt(createPropertyDto);

      const savedProperty =
        await this.propertyRepository.save(mappedPropertyData);

      if (pricing) {
        const { extraCharges, ...pricingData } = pricing;

        const mappedPricingData =
          PropertyMapper.createPricingDtoToPricintEntity(pricingData);

        const savedPricing = await this.pricingRepository.save({
          ...mappedPricingData,
          property: { id: savedProperty.id },
        });

        savedProperty.pricing = savedPricing;

        if (extraCharges && extraCharges.length > 0) {
          const mappedExtraCharges =
            PropertyMapper.createExtraChargeDtoToExtraChargeEntity(
              extraCharges,
              savedPricing.id,
            );

          savedPricing.extra_charges =
            await this.extraChargeRepository.saveMany(mappedExtraCharges);
        }
      }

      if (furnitures && furnitures.length > 0) {
        const mappedFurnitures =
          PropertyMapper.createFurnitureDtoToFurnitureEntity(
            furnitures,
            savedProperty.id,
          );

        savedProperty.furnitures =
          await this.furnitureRepository.saveMany(mappedFurnitures);
      }

      return savedProperty;
    } catch (error) {
      throw error;
    }
  }

  async getPropertyById(id: string) {
    try {
      const property = await this.propertyRepository.findWithRelations({
        where: { id },
        relations: [
          'assign_to',
          'project',
          'builder',
          'pricing',
          'pricing.extra_charges',
          'furnitures',
          'uploads',
          'locations',
          'amenities',
        ],
      });

      if (!property || property.length === 0) {
        throw new NotFoundException('Property not found');
      }

      return property[0];
    } catch (error) {
      throw error;
    }
  }

  async getAllProperties() {
    try {
      return await this.propertyRepository.findWithRelations({
        relations: [
          'assign_to',
          'project',
          'builder',
          'pricing',
          'pricing.extra_charges',
          'furnitures',
          'locations',
          'amenities',
        ],
      });
    } catch (error) {
      throw error;
    }
  }

  async updateProperty(id: string, updatePropertyDto: UpdatePropertyDto) {
    try {
      const existingProperty = await this.getPropertyById(id);

      const { pricing, furnitures } = updatePropertyDto;

      const mappedPropertyData =
        PropertyMapper.updatePropertyDtoToPropertyDataEntity(
          updatePropertyDto,
          existingProperty,
        );

      const updatedProperty =
        await this.propertyRepository.save(mappedPropertyData);

      if (pricing) {
        const { extraCharges, ...pricingData } = pricing;

        let pricingEntity: PropertyPricingEntity;

        if (existingProperty.pricing) {
          const mappedPricingData =
            PropertyMapper.updatePropertyDtoToPricingDataEntity(
              pricing,
              existingProperty,
            );

          pricingEntity = await this.pricingRepository.save({
            ...mappedPricingData,
            property: { id: updatedProperty.id },
          });
        } else {
          // Create new pricing
          const mappedPricingData =
            PropertyMapper.createPricingDtoToPricintEntity(pricingData);

          pricingEntity = await this.pricingRepository.save({
            ...mappedPricingData,
            property: { id: updatedProperty.id },
          });
        }
        updatedProperty.pricing = pricingEntity;

        // Handle extra charges update if provided
        if (extraCharges) {
          // Remove existing extra charges
          if (existingProperty.pricing?.extra_charges) {
            for (const charge of existingProperty.pricing.extra_charges) {
              await this.extraChargeRepository.remove(charge);
            }
          }

          // Add new extra charges
          if (extraCharges.length > 0) {
            const mappedExtraCharges =
              PropertyMapper.createExtraChargeDtoToExtraChargeEntity(
                extraCharges,
                pricingEntity.id,
              );

            updatedProperty.pricing.extra_charges =
              await this.extraChargeRepository.saveMany(mappedExtraCharges);
          }
        }
      }

      // Handle furniture update if provided
      if (furnitures) {
        // Remove existing furniture
        if (existingProperty.furnitures) {
          for (const furniture of existingProperty.furnitures) {
            await this.furnitureRepository.remove(furniture);
          }
        }

        // Add new furniture
        if (furnitures.length > 0) {
          const mappedFurnitures =
            PropertyMapper.createFurnitureDtoToFurnitureEntity(
              furnitures,
              updatedProperty.id,
            );

          updatedProperty.furnitures =
            await this.furnitureRepository.saveMany(mappedFurnitures);
        }
      }

      return updatedProperty;
    } catch (error) {
      throw error;
    }
  }

  async updatePropertyPricing(id: string, pricingData: UpdatePropertyPricingDataDto) {
    try {
      const existingProperty = await this.getPropertyById(id);

      let pricingEntity: PropertyPricingEntity;

      if (existingProperty.pricing) {
        const mappedPricingData =
          PropertyMapper.updatePricingDtoToPricingEntity(
            pricingData,
            existingProperty,
          );

        pricingEntity = await this.pricingRepository.save({
          ...mappedPricingData,
          property: { id: existingProperty.id },
        });
      } else {
        const mappedPricingData =
          PropertyMapper.createPricingDtoToPricintEntity(pricingData);

        pricingEntity = await this.pricingRepository.save({
          ...mappedPricingData,
          property: { id: existingProperty.id },
        });
      }

      return pricingEntity;
    } catch (error) {
      throw error;
    }
  }

  async updatePropertyExtraCharges(
    propertyId: string,
    pricingId: string,
    updateExtraChargesDto: UpdateExtraChargesDto[],
  ) {
    try {
      const existingProperty = await this.getPropertyById(propertyId);

      if (!existingProperty.pricing) {
        throw new NotFoundException('Property pricing not found');
      }

      // Remove existing extra charges
      if (existingProperty.pricing.extra_charges) {
        for (const charge of existingProperty.pricing.extra_charges) {
          await this.extraChargeRepository.remove(charge);
        }
      }

      // Add new extra charges
      if (
        updateExtraChargesDto &&
        updateExtraChargesDto.length > 0
      ) {
        const mappedExtraCharges =
          PropertyMapper.updateExtraChargeDtoToExtraChargeEntity(
            updateExtraChargesDto,
            pricingId,
          );

        return await this.extraChargeRepository.saveMany(mappedExtraCharges);
      }

      return [];
    } catch (error) {
      throw error;
    }
  }

  async updatePropertyFurnitures(
    propertyId: string,
    updateFurnituresDto: CreateFurnitureDto[],
  ) {
    try {
      const existingProperty = await this.getPropertyById(propertyId);

      // Remove existing furniture
      if (existingProperty.furnitures) {
        for (const furniture of existingProperty.furnitures) {
          await this.furnitureRepository.remove(furniture);
        }
      }

      // Add new furniture
      if (
        updateFurnituresDto &&
        updateFurnituresDto.length > 0
      ) {
        const mappedFurnitures =
          PropertyMapper.createFurnitureDtoToFurnitureEntity(
            updateFurnituresDto,
            propertyId,
          );

        return await this.furnitureRepository.saveMany(mappedFurnitures);
      }

      return [];
    } catch (error) {
      throw error;
    }
  }

  async deleteProperty(id: string) {
    try {
      const property = await this.getPropertyById(id);
      return await this.propertyRepository.remove(property);
    } catch (error) {
      throw error;
    }
  }

  async getPropertiesByFilters(filters: SearchPropertyQueryDto) {
    try {
      const queryOptions: any = {
        relations: [
          'assign_to',
          'project',
          'builder',
          'pricing',
          'locations',
          'amenities',
        ],
        where: {},
      };

      if (filters.propertyType) {
        queryOptions.where.property_type = filters.propertyType;
      }
      if (filters.listingFor) {
        queryOptions.where.listing_for = filters.listingFor;
      }
      if (filters.city) {
        queryOptions.where.city = filters.city;
      }
      if (filters.bhk) {
        queryOptions.where.bhk = filters.bhk;
      }

      return await this.propertyRepository.findWithRelations(queryOptions);
    } catch (error) {
      throw error;
    }
  }
}
