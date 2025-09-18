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
import { LeadSourceEntity } from '../db/entities/lead-source.entity';
import {
  CreateLeadSourceDto,
  UpdateLeadSourceDto,
} from './dto/create-lead-source.dto';
import { LeadSourceService } from './lead-source.service';

@Controller('lead-source')
export class LeadSourceController {
  constructor(private readonly leadSourceService: LeadSourceService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all lead sources',
    operationId: 'getAllLeadSources',
  })
  @ApiResponse({
    status: 200,
    description: 'List of lead sources retrieved successfully',
    type: [LeadSourceEntity],
  })
  async getAllLeadSources(): Promise<LeadSourceEntity[]> {
    return this.leadSourceService.getAllLeadSources();
  }

  @Post()
  @ApiOperation({
    summary: 'Create a new lead source',
    operationId: 'createLeadSource',
  })
  @ApiResponse({
    status: 201,
    description: 'Lead source created successfully',
    type: LeadSourceEntity,
  })
  async createLeadSource(
    @Body() createLeadSourceDto: CreateLeadSourceDto,
  ): Promise<LeadSourceEntity> {
    return this.leadSourceService.createLeadSource(createLeadSourceDto);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update a lead source by ID',
    operationId: 'updateLeadSource',
  })
  @ApiResponse({ status: 200, description: 'Lead source updated successfully' })
  async updateLeadSource(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateLeadSourceDto: UpdateLeadSourceDto,
  ): Promise<LeadSourceEntity> {
    return this.leadSourceService.updateLeadSource(id, updateLeadSourceDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a lead source by ID',
    operationId: 'deleteLeadSource',
  })
  @ApiResponse({ status: 200, description: 'Lead source deleted successfully' })
  async deleteLeadSource(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<boolean> {
    return this.leadSourceService.deleteLeadSource(id);
  }
}
