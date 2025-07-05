import { Body, Controller, Get, Post } from '@nestjs/common';
import { CityService } from './city.service';
import { CreateCityDto } from './dtos/create-city.dto';

@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Post()
  async createCity(@Body() createCityDto: CreateCityDto) {
    return await this.cityService.createCity(createCityDto);
  }

  @Get()
  async gelAllCity() {
    return await this.cityService.getAllCityList();
  }
}
