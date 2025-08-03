import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { BuilderService } from '../builder/builder.service';
import { ProjectEntity } from '../db/entities/project.entity';
import { ResidentialUnitEntity } from '../db/entities/residential-unit.entity';
import { CommercialUnitEntity } from '../db/entities/commercial-unit.entity';
import { LandPlotEntity } from '../db/entities/land-plot.entity';
import { UnitFloorPlanEntity } from '../db/entities/unit-floor-plan.entity';
import {
  ProjectRepositoryInterface,
  ResidentialUnitRepositoryInterface,
  CommercialUnitRepositoryInterface,
  LandPlotRepositoryInterface,
  UnitFloorPlanRepositoryInterface,
} from '../db/interfaces/project.interface';
import { AmenitiesRepositoryInterface } from './../db/interfaces/amenities.interface';
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

@Injectable()
export class ProjectManagementService {
  constructor(
    @Inject('projectRepositoryInterface')
    private readonly projectRepository: ProjectRepositoryInterface,
    @Inject('residentialUnitRepositoryInterface')
    private readonly residentialUnitRepository: ResidentialUnitRepositoryInterface,
    @Inject('commercialUnitRepositoryInterface')
    private readonly commercialUnitRepository: CommercialUnitRepositoryInterface,
    @Inject('landPlotRepositoryInterface')
    private readonly landPlotRepository: LandPlotRepositoryInterface,
    @Inject('unitFloorPlanRepositoryInterface')
    private readonly unitFloorPlanRepository: UnitFloorPlanRepositoryInterface,
    @Inject('amenitiesRepositoryInterface')
    private readonly amenitiesRepository: AmenitiesRepositoryInterface,
    private readonly builderService: BuilderService,
  ) {}

  async createProject(
    createProjectDto: CreateProjectDto,
  ): Promise<ProjectEntity> {
    try {
      const builder = await this.builderService.getBuilderById(
        createProjectDto.builder_id,
      );
      return await this.projectRepository.save(createProjectDto);
    } catch (error) {
      throw error;
    }
  }

  async getProjectById(
    id: string,
    fetchUnits: boolean = false,
  ): Promise<ProjectEntity> {
    try {
      const project = await this.projectRepository.findByCondition({
        where: {
          id,
        },
        relations: {
          residential_units: fetchUnits,
          commercial_units: fetchUnits,
          land_plots: fetchUnits,
        },
      });
      if (!project) {
        throw new NotFoundException('Project not found');
      }
      return project;
    } catch (error) {
      throw error;
    }
  }

  async getAllProjects(): Promise<ProjectEntity[]> {
    try {
      return await this.projectRepository.findAll();
    } catch (error) {
      throw error;
    }
  }

  async updateProject(
    id: string,
    updateProjectDto: UpdateProjectDto,
  ): Promise<ProjectEntity> {
    try {
      const project = await this.projectRepository.findOneById(id);
      if (!project) {
        throw new NotFoundException('Project not found');
      }
      const updatedProject = {
        ...project,
        ...updateProjectDto,
        id: project.id,
      };
      return await this.projectRepository.save(updatedProject);
    } catch (error) {
      throw error;
    }
  }

  async getAllAmenities() {
    try {
      return await this.amenitiesRepository.findAll();
    } catch (error) {
      throw error;
    }
  }
}
