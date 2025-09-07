import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { AmenitiesRepositoryInterface } from '../db/interfaces/amenities.interface';
import { CreateAmenitiesDto } from './dtos/create-amenities.dto';

@Injectable()
export class AmenitiesService {
  constructor(
    @Inject('amenitiesRepositoryInterface')
    private readonly amenitiesRepository: AmenitiesRepositoryInterface,
  ) {}

  async getAllAmenities() {
    try {
      return await this.amenitiesRepository.findAll({ order: { id: 'ASC' } });
    } catch (error) {
      throw error;
    }
  }

  async createAmenity(createAmenitiesDto: CreateAmenitiesDto) {
    try {
      await this.amenitiesRepository.save(createAmenitiesDto);
      return true;
    } catch (error) {
      throw error;
    }
  }

  async updateAmenity(id: number, createAmenitiesDto: CreateAmenitiesDto) {
    try {
      const exist = await this.findById(id);
      exist.name = createAmenitiesDto.name;

      await this.amenitiesRepository.save(exist);
      return true;
    } catch (error) {
      throw error;
    }
  }

  async findById(id: number) {
    try {
      const exist = await this.amenitiesRepository.findOneById(id);
      if (!exist) {
        throw new NotFoundException('amenity not found.');
      }
      return exist;
    } catch (error) {
      throw error;
    }
  }

  async deleteAmenity(id: number) {
    try {
      const amenity = await this.findById(id);
      await this.amenitiesRepository.remove(amenity);
      return true;
    } catch (error) {
      throw error;
    }
  }
}
