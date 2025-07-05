import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserRoleEnum } from '../db/entities/user.entity';
import { Roles } from '../decorators/roles.decorator';

import { RolesGuard } from '../auth/strategies/roles.guard';
import { LeadActivityEntity } from '../db/entities/lead-activity.entity';
import { LeadSourceEntity } from '../db/entities/lead-source.entity';
import {
  CreateLeadDto,
  FindLeadsDto,
  LeadResponseDto,
  PaginatedResponseDto,
  UpdateLeadDto,
} from './dto';
import { CreateLeadSourceDto } from './dto/create-lead-source.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { LeadsActivityService } from './leads-activity.service';
import { LeadsService } from './leads.service';

@ApiTags('leads')
@Controller('leads')
// @UseGuards(JwtAuthGuard)
// @ApiBearerAuth()
export class LeadsController {
  constructor(
    private readonly leadsService: LeadsService,
    private readonly leadsActivityService: LeadsActivityService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all leads' })
  @ApiResponse({
    status: 200,
    description: 'List of leads retrieved successfully',
    type: PaginatedResponseDto,
  })
  async findAll(
    @Query() query: FindLeadsDto,
  ): Promise<PaginatedResponseDto<LeadResponseDto>> {
    return this.leadsService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a lead by ID', operationId: 'findOne' })
  @ApiResponse({
    status: 200,
    description: 'Lead retrieved successfully',
    type: LeadResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Lead not found' })
  async findOne(@Param('id') id: string): Promise<LeadResponseDto> {
    return this.leadsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new lead' })
  @ApiResponse({
    status: 201,
    description: 'Lead created successfully',
    type: LeadResponseDto,
  })
  async create(@Body() createLeadDto: CreateLeadDto): Promise<LeadResponseDto> {
    return this.leadsService.create(createLeadDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a lead by ID' })
  @ApiResponse({
    status: 200,
    description: 'Lead updated successfully',
    type: LeadResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Lead not found' })
  async update(
    @Param('id') id: string,
    @Body() updateLeadDto: UpdateLeadDto,
  ): Promise<LeadResponseDto> {
    return this.leadsService.update(id, updateLeadDto);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRoleEnum.ADMIN)
  @ApiOperation({ summary: 'Delete a lead by ID' })
  @ApiResponse({ status: 204, description: 'Lead deleted successfully' })
  @ApiResponse({ status: 404, description: 'Lead not found' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.leadsService.remove(id);
  }

  @Put(':leadId/activity/:activityId')
  @ApiOperation({ summary: 'Update an activity by ID' })
  @ApiResponse({
    status: 200,
    description: 'Lead retrieved successfully',
    type: LeadResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Lead not found' })
  async updateActivity(
    @Param('activityId') activityId: string,
    @Body() updateActivityDto: UpdateActivityDto,
  ): Promise<LeadActivityEntity> {
    return this.leadsActivityService.updateActivity(
      activityId,
      updateActivityDto,
    );
  }

}
