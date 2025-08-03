import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreateCommercialUnitDto } from './dtos/create-commercial-unit.dto';
import { CreateLandPlotDto } from './dtos/create-land-plot.dto';
import { CreateResidentialUnitDto } from './dtos/create-residential-unit.dto';
import { CreateUnitFloorPlanDto } from './dtos/create-unit-floor-plan.dto';
import { UpdateCommercialUnitDto } from './dtos/update-commercial-unit.dto';
import { UpdateLandPlotDto } from './dtos/update-land-plot.dto';
import { UpdateResidentialUnitDto } from './dtos/update-residential-unit.dto';
import { UpdateUnitFloorPlanDto } from './dtos/update-unit-floor-plan.dto';
import { ProjectUnitTypeService } from './project-unit-type.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('project-unit-type')
@ApiTags('Project Unit Type')
export class ProjectUnitTypeController {
  constructor(
    private readonly projectUnitTypeService: ProjectUnitTypeService,
  ) {}
  // Residential Unit Endpoints
  @Post('residential-unit')
  async createResidentialUnit(
    @Body() createResidentialUnitDto: CreateResidentialUnitDto,
  ) {
    return await this.projectUnitTypeService.createResidentialUnit(
      createResidentialUnitDto,
    );
  }

  @Get('residential-unit/:id')
  async getResidentialUnitById(@Param('id') id: string) {
    return await this.projectUnitTypeService.getResidentialUnitById(id);
  }

  @Get('project/:projectId/residential-units')
  async getResidentialUnitsByProjectId(@Param('projectId') projectId: string) {
    return await this.projectUnitTypeService.getResidentialUnitsByProjectId(
      projectId,
    );
  }

  @Put('residential-unit/:id')
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
  async createCommercialUnit(
    @Body() createCommercialUnitDto: CreateCommercialUnitDto,
  ) {
    return await this.projectUnitTypeService.createCommercialUnit(
      createCommercialUnitDto,
    );
  }

  @Get('commercial-unit/:id')
  async getCommercialUnitById(@Param('id') id: string) {
    return await this.projectUnitTypeService.getCommercialUnitById(id);
  }

  @Get('project/:projectId/commercial-units')
  async getCommercialUnitsByProjectId(@Param('projectId') projectId: string) {
    return await this.projectUnitTypeService.getCommercialUnitsByProjectId(
      projectId,
    );
  }

  @Put('commercial-unit/:id')
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
  async createLandPlot(@Body() createLandPlotDto: CreateLandPlotDto) {
    return await this.projectUnitTypeService.createLandPlot(createLandPlotDto);
  }

  @Get('land-plot/:id')
  async getLandPlotById(@Param('id') id: string) {
    return await this.projectUnitTypeService.getLandPlotById(id);
  }

  @Get('project/:projectId/land-plots')
  async getLandPlotsByProjectId(@Param('projectId') projectId: string) {
    return await this.projectUnitTypeService.getLandPlotsByProjectId(projectId);
  }

  @Put('land-plot/:id')
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
  async createUnitFloorPlan(
    @Body() createUnitFloorPlanDto: CreateUnitFloorPlanDto,
  ) {
    return await this.projectUnitTypeService.createUnitFloorPlan(
      createUnitFloorPlanDto,
    );
  }

  @Get('unit-floor-plan/:id')
  async getUnitFloorPlanById(@Param('id') id: string) {
    return await this.projectUnitTypeService.getUnitFloorPlanById(id);
  }

  @Get('residential-unit/:unitId/floor-plans')
  async getUnitFloorPlansByResidentialUnitId(@Param('unitId') unitId: string) {
    return await this.projectUnitTypeService.getUnitFloorPlansByResidentialUnitId(
      unitId,
    );
  }

  @Get('commercial-unit/:unitId/floor-plans')
  async getUnitFloorPlansByCommercialUnitId(@Param('unitId') unitId: string) {
    return await this.projectUnitTypeService.getUnitFloorPlansByCommercialUnitId(
      unitId,
    );
  }

  @Get('land-plot/:plotId/floor-plans')
  async getUnitFloorPlansByLandPlotId(@Param('plotId') plotId: string) {
    return await this.projectUnitTypeService.getUnitFloorPlansByLandPlotId(
      plotId,
    );
  }

  @Put('unit-floor-plan/:id')
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
