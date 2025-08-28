import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  CreateFurnitureDto,
  CreatePropertyDto,
} from './dtos/create-property.dto';
import { SearchPropertyQueryDto } from './dtos/search-property-query.dto';
import {
  UpdateExtraChargesDto,
  UpdatePropertyDto,
  UpdatePropertyPricingDataDto,
} from './dtos/update-property.dto';
import { PropertyManagementService } from './property-management.service';

@ApiTags('Property Management')
@Controller('property-management')
export class PropertyManagementController {
  constructor(
    private readonly propertyManagementService: PropertyManagementService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new property',
    description:
      'Create a new property with pricing, furniture, and other details',
  })
  @ApiResponse({
    status: 201,
    description: 'Property created successfully with all related data',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - Invalid input data',
  })
  async createProperty(@Body() createPropertyDto: CreatePropertyDto) {
    return await this.propertyManagementService.createProperty(
      createPropertyDto,
    );
  }

  @Get()
  @ApiOperation({
    summary: 'Get all properties or filter properties',
    description:
      'Retrieve all properties with optional filtering by type, listing, city, etc.',
  })
  @ApiResponse({
    status: 200,
    description: 'Properties retrieved successfully with all relations',
  })
  async getAllProperties(
    @Query() searchPropertyQueryDto?: SearchPropertyQueryDto,
  ) {
    return await this.propertyManagementService.getAllProperties(searchPropertyQueryDto);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a property by ID',
    description:
      'Retrieve a specific property with all related data including pricing, furniture, amenities, etc.',
  })
  @ApiResponse({
    status: 200,
    description: 'Property retrieved successfully with all relations',
  })
  @ApiResponse({
    status: 404,
    description: 'Property not found',
  })
  async getPropertyById(@Param('id', ParseUUIDPipe) id: string) {
    return await this.propertyManagementService.getPropertyById(id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update a property by ID',
    description:
      'Update property details including pricing, furniture, and other related data',
  })
  @ApiResponse({
    status: 200,
    description: 'Property updated successfully with all related data',
  })
  @ApiResponse({
    status: 404,
    description: 'Property not found',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - Invalid input data',
  })
  async updateProperty(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePropertyDto: UpdatePropertyDto,
  ) {
    return await this.propertyManagementService.updateProperty(
      id,
      updatePropertyDto,
    );
  }

  @Put(':id/pricing')
  @ApiOperation({
    summary: 'Update property pricing',
    description: 'Update pricing information for a specific property',
  })
  @ApiResponse({
    status: 200,
    description: 'Property pricing updated successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Property not found',
  })
  async updatePropertyPricing(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePricingDto: UpdatePropertyPricingDataDto,
  ) {
    return await this.propertyManagementService.updatePropertyPricing(
      id,
      updatePricingDto,
    );
  }

  @Put(':propertyId/pricing/:pricingId/extra-charges')
  @ApiOperation({
    summary: 'Update property extra charges',
    description: 'Update extra charges for a specific property pricing',
  })
  @ApiResponse({
    status: 200,
    description: 'Property extra charges updated successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Property or pricing not found',
  })
  async updatePropertyExtraCharges(
    @Param('propertyId', ParseUUIDPipe) propertyId: string,
    @Param('pricingId', ParseUUIDPipe) pricingId: string,
    @Body() updateExtraChargesDto: UpdateExtraChargesDto[],
  ) {
    return await this.propertyManagementService.updatePropertyExtraCharges(
      propertyId,
      pricingId,
      updateExtraChargesDto,
    );
  }

  @Put(':id/furnitures')
  @ApiOperation({
    summary: 'Update property furnitures',
    description: 'Update furniture information for a specific property',
  })
  @ApiResponse({
    status: 200,
    description: 'Property furnitures updated successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Property not found',
  })
  async updatePropertyFurnitures(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateFurnituresDto: CreateFurnitureDto[],
  ) {
    return await this.propertyManagementService.updatePropertyFurnitures(
      id,
      updateFurnituresDto,
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Delete a property by ID',
    description: 'Soft delete a property and all its related data',
  })
  @ApiResponse({
    status: 204,
    description: 'Property deleted successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Property not found',
  })
  async deleteProperty(@Param('id', ParseUUIDPipe) id: string) {
    await this.propertyManagementService.deleteProperty(id);
  }
}
