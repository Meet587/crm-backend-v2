import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateCommercialUnitDto } from './dtos/create-commercial-unit.dto';
import { CreateLandPlotDto } from './dtos/create-land-plot.dto';
import { CreateResidentialUnitDto } from './dtos/create-residential-unit.dto';
import { CreateUnitFloorPlanDto } from './dtos/create-unit-floor-plan.dto';
import { UpdateCommercialUnitDto } from './dtos/update-commercial-unit.dto';
import { UpdateLandPlotDto } from './dtos/update-land-plot.dto';
import { UpdateResidentialUnitDto } from './dtos/update-residential-unit.dto';
import { UpdateUnitFloorPlanDto } from './dtos/update-unit-floor-plan.dto';
import { ProjectUnitTypeService } from './project-unit-type.service';

@Controller('project-unit-type')
@ApiTags('Project Unit Type')
export class ProjectUnitTypeController {
  constructor(
    private readonly projectUnitTypeService: ProjectUnitTypeService,
  ) {}
  // Residential Unit Endpoints
  @Post('residential-unit')
  @ApiOperation({ summary: 'Create a new residential unit' })
  @ApiResponse({
    status: 201,
    description: 'Residential unit created successfully',
  })
  async createResidentialUnit(
    @Body() createResidentialUnitDto: CreateResidentialUnitDto,
  ) {
    return await this.projectUnitTypeService.createResidentialUnit(
      createResidentialUnitDto,
    );
  }

  @Get('residential-unit/:id')
  @ApiOperation({ summary: 'Get a residential unit by id' })
  @ApiResponse({
    status: 200,
    description: 'Residential unit retrieved successfully',
  })
  async getResidentialUnitById(@Param('id') id: string) {
    return await this.projectUnitTypeService.getResidentialUnitById(id);
  }

  @Get('project/:projectId/residential-units')
  @ApiOperation({ summary: 'Get all residential units by project id' })
  @ApiResponse({
    status: 200,
    description: 'Residential units retrieved successfully',
  })
  async getResidentialUnitsByProjectId(@Param('projectId') projectId: string) {
    return await this.projectUnitTypeService.getResidentialUnitsByProjectId(
      projectId,
    );
  }

  @Put('residential-unit/:id')
  @ApiOperation({ summary: 'Update a residential unit by id' })
  @ApiResponse({
    status: 200,
    description: 'Residential unit updated successfully',
  })
  async updateResidentialUnit(
    @Param('id') id: string,
    @Body() updateResidentialUnitDto: UpdateResidentialUnitDto,
  ) {
    return await this.projectUnitTypeService.updateResidentialUnit(
      id,
      updateResidentialUnitDto,
    );
  }

  // Commercial Unit Endpoints
  @Post('commercial-unit')
  @ApiOperation({ summary: 'Create a new commercial unit' })
  @ApiResponse({
    status: 201,
    description: 'Commercial unit created successfully',
  })
  async createCommercialUnit(
    @Body() createCommercialUnitDto: CreateCommercialUnitDto,
  ) {
    return await this.projectUnitTypeService.createCommercialUnit(
      createCommercialUnitDto,
    );
  }

  @Get('commercial-unit/:id')
  @ApiOperation({ summary: 'Get a commercial unit by id' })
  @ApiResponse({
    status: 200,
    description: 'Commercial unit retrieved successfully',
  })
  async getCommercialUnitById(@Param('id') id: string) {
    return await this.projectUnitTypeService.getCommercialUnitById(id);
  }

  @Get('project/:projectId/commercial-units')
  @ApiOperation({ summary: 'Get all commercial units by project id' })
  @ApiResponse({
    status: 200,
    description: 'Commercial units retrieved successfully',
  })
  async getCommercialUnitsByProjectId(@Param('projectId') projectId: string) {
    return await this.projectUnitTypeService.getCommercialUnitsByProjectId(
      projectId,
    );
  }

  @Put('commercial-unit/:id')
  @ApiOperation({ summary: 'Update a commercial unit by id' })
  @ApiResponse({
    status: 200,
    description: 'Commercial unit updated successfully',
  })
  async updateCommercialUnit(
    @Param('id') id: string,
    @Body() updateCommercialUnitDto: UpdateCommercialUnitDto,
  ) {
    return await this.projectUnitTypeService.updateCommercialUnit(
      id,
      updateCommercialUnitDto,
    );
  }

  // Land Plot Endpoints
  @Post('land-plot')
  @ApiOperation({ summary: 'Create a new land plot' })
  @ApiResponse({ status: 201, description: 'Land plot created successfully' })
  async createLandPlot(@Body() createLandPlotDto: CreateLandPlotDto) {
    return await this.projectUnitTypeService.createLandPlot(createLandPlotDto);
  }

  @Get('land-plot/:id')
  @ApiOperation({ summary: 'Get a land plot by id' })
  @ApiResponse({ status: 200, description: 'Land plot retrieved successfully' })
  async getLandPlotById(@Param('id') id: string) {
    return await this.projectUnitTypeService.getLandPlotById(id);
  }

  @Get('project/:projectId/land-plots')
  @ApiOperation({ summary: 'Get all land plots by project id' })
  @ApiResponse({
    status: 200,
    description: 'Land plots retrieved successfully',
  })
  async getLandPlotsByProjectId(@Param('projectId') projectId: string) {
    return await this.projectUnitTypeService.getLandPlotsByProjectId(projectId);
  }

  @Put('land-plot/:id')
  @ApiOperation({ summary: 'Update a land plot by id' })
  @ApiResponse({ status: 200, description: 'Land plot updated successfully' })
  async updateLandPlot(
    @Param('id') id: string,
    @Body() updateLandPlotDto: UpdateLandPlotDto,
  ) {
    return await this.projectUnitTypeService.updateLandPlot(
      id,
      updateLandPlotDto,
    );
  }

  // Unit Floor Plan Endpoints
  @Post('unit-floor-plan')
  @ApiOperation({ summary: 'add a new unit floor plan' })
  @ApiResponse({
    status: 201,
    description: 'Unit floor plan added successfully',
  })
  async createUnitFloorPlan(
    @Body() createUnitFloorPlanDto: CreateUnitFloorPlanDto,
  ) {
    return await this.projectUnitTypeService.createUnitFloorPlan(
      createUnitFloorPlanDto,
    );
  }

  @Get('unit-floor-plan/:id')
  @ApiOperation({ summary: 'Get a unit floor plan by id' })
  @ApiResponse({
    status: 200,
    description: 'Unit floor plan retrieved successfully',
  })
  async getUnitFloorPlanById(@Param('id') id: string) {
    return await this.projectUnitTypeService.getUnitFloorPlanById(id);
  }

  @Get('residential-unit/:unitId/floor-plans')
  @ApiOperation({ summary: 'Get all unit floor plans by residential unit id' })
  @ApiResponse({
    status: 200,
    description: 'Unit floor plans retrieved successfully',
  })
  async getUnitFloorPlansByResidentialUnitId(@Param('unitId') unitId: string) {
    return await this.projectUnitTypeService.getUnitFloorPlansByResidentialUnitId(
      unitId,
    );
  }

  @Get('commercial-unit/:unitId/floor-plans')
  @ApiOperation({ summary: 'Get all unit floor plans by commercial unit id' })
  @ApiResponse({
    status: 200,
    description: 'Unit floor plans retrieved successfully',
  })
  async getUnitFloorPlansByCommercialUnitId(@Param('unitId') unitId: string) {
    return await this.projectUnitTypeService.getUnitFloorPlansByCommercialUnitId(
      unitId,
    );
  }

  @Get('land-plot/:plotId/floor-plans')
  @ApiOperation({ summary: 'Get all unit floor plans by land plot id' })
  @ApiResponse({
    status: 200,
    description: 'Unit floor plans retrieved successfully',
  })
  async getUnitFloorPlansByLandPlotId(@Param('plotId') plotId: string) {
    return await this.projectUnitTypeService.getUnitFloorPlansByLandPlotId(
      plotId,
    );
  }

  @Put('unit-floor-plan/:id')
  @ApiOperation({ summary: 'Update a unit floor plan by id' })
  @ApiResponse({
    status: 200,
    description: 'Unit floor plan updated successfully',
  })
  async updateUnitFloorPlan(
    @Param('id') id: string,
    @Body() updateUnitFloorPlanDto: UpdateUnitFloorPlanDto,
  ) {
    return await this.projectUnitTypeService.updateUnitFloorPlan(
      id,
      updateUnitFloorPlanDto,
    );
  }
}
