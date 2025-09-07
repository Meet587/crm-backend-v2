import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AmenitiesService } from './amenities.service';
import { CreateAmenitiesDto } from './dtos/create-amenities.dto';

@Controller('amenities')
@ApiTags('Amenities')
export class AmenitiesController {
  constructor(private readonly amenitiesService: AmenitiesService) {}

  @Get('list')
  async getAllAmenities() {
    return await this.amenitiesService.getAllAmenities();
  }

  @Post('')
  @ApiOperation({ summary: 'create amenity' })
  @ApiResponse({ status: 200, description: 'amenity created successfully' })
  async createAmenity(@Body() createAmenitiesDto: CreateAmenitiesDto) {
    return await this.amenitiesService.createAmenity(createAmenitiesDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'update amenity' })
  @ApiResponse({ status: 200, description: 'amenity updated successfully' })
  async updateAmenity(
    @Param('id', ParseIntPipe) id: number,
    @Body() createAmenitiesDto: CreateAmenitiesDto,
  ) {
    return await this.amenitiesService.updateAmenity(id, createAmenitiesDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'delete amenity' })
  async deleteAmenity(@Param('id', ParseIntPipe) id: number) {
    return await this.amenitiesService.deleteAmenity(id);
  }
}
