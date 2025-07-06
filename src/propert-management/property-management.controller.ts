import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePropertyDto } from './dtos/create-property.dto';
import { UpdatePropertyDto } from './dtos/update-property.dto';
import { PropertyManagementService } from './property-management.service';

@ApiTags('Property Management')
@Controller('property-management')
export class PropertyManagementController {
  constructor(
    private readonly propertyManagementService: PropertyManagementService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new property' })
  @ApiResponse({ status: 201, description: 'Property created successfully' })
  async createProperty(@Body() createPropertyDto: CreatePropertyDto) {
    return await this.propertyManagementService.createProperty(
      createPropertyDto,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a property by id' })
  @ApiResponse({ status: 200, description: 'Property retrieved successfully' })
  async getPropertyById(@Param('id', ParseUUIDPipe) id: string) {
    return await this.propertyManagementService.getPropertyById(id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all properties' })
  @ApiResponse({
    status: 200,
    description: 'Properties retrieved successfully',
  })
  async getAllProperties() {
    return await this.propertyManagementService.getAllProperties();
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a property by id' })
  @ApiResponse({ status: 200, description: 'Property updated successfully' })
  async updateProperty(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePropertyDto: UpdatePropertyDto,
  ) {
    return await this.propertyManagementService.updateProperty(
      id,
      updatePropertyDto,
    );
  }
}
