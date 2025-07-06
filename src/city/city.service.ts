import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CityEntity } from '../db/entities/city.entity';
import { CityRepositoryInterface } from '../db/interfaces/city.interface';
import { CreateCityDto } from './dtos/create-city.dto';

@Injectable()
export class CityService {
  constructor(
    @Inject('cityRepositoryInterface')
    private readonly cityRepository: CityRepositoryInterface,
  ) {}

  async createCity(createCityDto: CreateCityDto): Promise<CityEntity> {
    try {
      return this.cityRepository.save(createCityDto);
    } catch (error) {
      throw error;
    }
  }

  async getAllCityList() {
    try {
      return await this.cityRepository.findAll();
    } catch (error) {
      throw error;
    }
  }

  async getCityById(id: string): Promise<CityEntity> {
    try {
      const city = await this.cityRepository.findOneById(id);
      if (!city) {
        throw new NotFoundException('City not found');
      }
      return city;
    } catch (error) {
      throw error;
    }
  }
}
