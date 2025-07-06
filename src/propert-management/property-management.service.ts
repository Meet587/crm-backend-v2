import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PropertyRepositoryInterface } from '../db/interfaces/property.interface';
import { CreatePropertyDto } from './dtos/create-property.dto';
import { UpdatePropertyDto } from './dtos/update-property.dto';

@Injectable()
export class PropertyManagementService {
  constructor(
    @Inject('propertyRepositoryInterface')
    private readonly propertyRepository: PropertyRepositoryInterface,
  ) {}

  async createProperty(createPropertyDto: CreatePropertyDto) {
    try {
      return await this.propertyRepository.save(createPropertyDto);
    } catch (error) {
      throw error;
    }
  }

  async getPropertyById(id: string) {
    try {
      const property = await this.propertyRepository.findOneById(id);
      if (!property) {
        throw new NotFoundException('Property not found');
      }
      return property;
    } catch (error) {
      throw error;
    }
  }

  async getAllProperties() {
    try {
      return await this.propertyRepository.findAll();
    } catch (error) {
      throw error;
    }
  }

  async updateProperty(id: string, updatePropertyDto: UpdatePropertyDto) {
    try {
      const property = await this.getPropertyById(id);
      const updateDate = {
        ...property,
        ...updatePropertyDto,
        id: property.id,
      };
      return await this.propertyRepository.save(updateDate);
    } catch (error) {
      throw error;
    }
  }
}
