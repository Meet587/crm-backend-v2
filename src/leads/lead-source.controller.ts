import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LeadSourceEntity } from '../db/entities/lead-source.entity';
import { CreateLeadSourceDto } from './dto/create-lead-source.dto';
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
}
