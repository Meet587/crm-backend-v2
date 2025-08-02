import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateProjectDto } from './dtos/create-project.dto';
import { UpdateProjectDto } from './dtos/update-project.dto';
import { CreateResidentialUnitDto } from './dtos/create-residential-unit.dto';
import { UpdateResidentialUnitDto } from './dtos/update-residential-unit.dto';
import { CreateCommercialUnitDto } from './dtos/create-commercial-unit.dto';
import { UpdateCommercialUnitDto } from './dtos/update-commercial-unit.dto';
import { CreateLandPlotDto } from './dtos/create-land-plot.dto';
import { UpdateLandPlotDto } from './dtos/update-land-plot.dto';
import { CreateUnitFloorPlanDto } from './dtos/create-unit-floor-plan.dto';
import { UpdateUnitFloorPlanDto } from './dtos/update-unit-floor-plan.dto';
import { ProjectManagementService } from './project-management.service';

@Controller('project')
@ApiTags('Project Management')
export class ProjectManagementController {
  constructor(
    private readonly projectManagementService: ProjectManagementService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new project' })
  @ApiResponse({ status: 201, description: 'Project created successfully' })
  async createProject(@Body() createProjectDto: CreateProjectDto) {
    return this.projectManagementService.createProject(createProjectDto);
  }

  @Get('project/:id')
  async getProjectById(
    @Param('id') id: string,
    @Query('fetchUnits') fetchUnits: boolean,
  ) {
    return await this.projectManagementService.getProjectById(id, fetchUnits);
  }

  @Get()
  @ApiOperation({ summary: 'Get all projects' })
  @ApiResponse({ status: 200, description: 'Projects retrieved successfully' })
  async getAllProjects() {
    return await this.projectManagementService.getAllProjects();
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a project by ID' })
  @ApiResponse({ status: 200, description: 'Project updated successfully' })
  async updateProject(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    return await this.projectManagementService.updateProject(
      id,
      updateProjectDto,
    );
  }

  @Get('amenities')
  async getAllAmenities() {
    return await this.projectManagementService.getAllAmenities();
  }

  // Residential Unit Endpoints
  @Post('residential-unit')
  async createResidentialUnit(
    @Body() createResidentialUnitDto: CreateResidentialUnitDto,
  ) {
    return await this.projectManagementService.createResidentialUnit(
      createResidentialUnitDto,
    );
  }

  @Get('residential-unit/:id')
  async getResidentialUnitById(@Param('id') id: string) {
    return await this.projectManagementService.getResidentialUnitById(id);
  }

  @Get('project/:projectId/residential-units')
  async getResidentialUnitsByProjectId(@Param('projectId') projectId: string) {
    return await this.projectManagementService.getResidentialUnitsByProjectId(
      projectId,
    );
  }

  @Put('residential-unit/:id')
  async updateResidentialUnit(
    @Param('id') id: string,
    @Body() updateResidentialUnitDto: UpdateResidentialUnitDto,
  ) {
    return await this.projectManagementService.updateResidentialUnit(
      id,
      updateResidentialUnitDto,
    );
  }

  // Commercial Unit Endpoints
  @Post('commercial-unit')
  async createCommercialUnit(
    @Body() createCommercialUnitDto: CreateCommercialUnitDto,
  ) {
    return await this.projectManagementService.createCommercialUnit(
      createCommercialUnitDto,
    );
  }

  @Get('commercial-unit/:id')
  async getCommercialUnitById(@Param('id') id: string) {
    return await this.projectManagementService.getCommercialUnitById(id);
  }

  @Get('project/:projectId/commercial-units')
  async getCommercialUnitsByProjectId(@Param('projectId') projectId: string) {
    return await this.projectManagementService.getCommercialUnitsByProjectId(
      projectId,
    );
  }

  @Put('commercial-unit/:id')
  async updateCommercialUnit(
    @Param('id') id: string,
    @Body() updateCommercialUnitDto: UpdateCommercialUnitDto,
  ) {
    return await this.projectManagementService.updateCommercialUnit(
      id,
      updateCommercialUnitDto,
    );
  }

  // Land Plot Endpoints
  @Post('land-plot')
  async createLandPlot(@Body() createLandPlotDto: CreateLandPlotDto) {
    return await this.projectManagementService.createLandPlot(
      createLandPlotDto,
    );
  }

  @Get('land-plot/:id')
  async getLandPlotById(@Param('id') id: string) {
    return await this.projectManagementService.getLandPlotById(id);
  }

  @Get('project/:projectId/land-plots')
  async getLandPlotsByProjectId(@Param('projectId') projectId: string) {
    return await this.projectManagementService.getLandPlotsByProjectId(
      projectId,
    );
  }

  @Put('land-plot/:id')
  async updateLandPlot(
    @Param('id') id: string,
    @Body() updateLandPlotDto: UpdateLandPlotDto,
  ) {
    return await this.projectManagementService.updateLandPlot(
      id,
      updateLandPlotDto,
    );
  }

  // Unit Floor Plan Endpoints
  @Post('unit-floor-plan')
  async createUnitFloorPlan(
    @Body() createUnitFloorPlanDto: CreateUnitFloorPlanDto,
  ) {
    return await this.projectManagementService.createUnitFloorPlan(
      createUnitFloorPlanDto,
    );
  }

  @Get('unit-floor-plan/:id')
  async getUnitFloorPlanById(@Param('id') id: string) {
    return await this.projectManagementService.getUnitFloorPlanById(id);
  }

  @Get('residential-unit/:unitId/floor-plans')
  async getUnitFloorPlansByResidentialUnitId(@Param('unitId') unitId: string) {
    return await this.projectManagementService.getUnitFloorPlansByResidentialUnitId(
      unitId,
    );
  }

  @Get('commercial-unit/:unitId/floor-plans')
  async getUnitFloorPlansByCommercialUnitId(@Param('unitId') unitId: string) {
    return await this.projectManagementService.getUnitFloorPlansByCommercialUnitId(
      unitId,
    );
  }

  @Get('land-plot/:plotId/floor-plans')
  async getUnitFloorPlansByLandPlotId(@Param('plotId') plotId: string) {
    return await this.projectManagementService.getUnitFloorPlansByLandPlotId(
      plotId,
    );
  }

  @Put('unit-floor-plan/:id')
  async updateUnitFloorPlan(
    @Param('id') id: string,
    @Body() updateUnitFloorPlanDto: UpdateUnitFloorPlanDto,
  ) {
    return await this.projectManagementService.updateUnitFloorPlan(
      id,
      updateUnitFloorPlanDto,
    );
  }
}
