import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { DealService } from './deal.service';
import { CreateDealDto } from './dto/create-deal.dto';
import { UpdateDealDto } from './dto/update-deal.dto';

@Controller('deal')
export class DealController {
  constructor(private readonly dealService: DealService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new deal' })
  @ApiResponse({
    status: 201,
    description: 'The deal has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  async createDeal(@Body() createDealDto: CreateDealDto) {
    return await this.dealService.createDeal(createDealDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a deal by ID' })
  @ApiResponse({
    status: 200,
    description: 'The deal has been successfully retrieved.',
  })
  @ApiResponse({ status: 404, description: 'Deal not found.' })
  async getDealById(@Param('id', ParseUUIDPipe) id: string) {
    return await this.dealService.getDealById(id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all deals' })
  @ApiResponse({
    status: 200,
    description: 'Deals have been successfully retrieved.',
  })
  async getAllDeals() {
    return await this.dealService.getAllDeals();
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a deal by ID' })
  @ApiResponse({
    status: 200,
    description: 'The deal has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Deal not found.' })
  async updateDeal(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDealDto: UpdateDealDto,
  ) {
    return await this.dealService.updateDeal(id, updateDealDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a deal by ID' })
  @ApiResponse({
    status: 200,
    description: 'The deal has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Deal not found.' })
  async deleteDeal(@Param('id', ParseUUIDPipe) id: string) {
    return await this.dealService.deleteDeal(id);
  }
}
