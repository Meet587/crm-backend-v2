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

  // Residential Unit Methods
  async createResidentialUnit(
    createResidentialUnitDto: CreateResidentialUnitDto,
  ): Promise<ResidentialUnitEntity> {
    try {
      // Verify project exists
      const project = await this.projectRepository.findOneById(
        createResidentialUnitDto.project_id,
      );
      if (!project) {
        throw new NotFoundException('Project not found');
      }
      return await this.residentialUnitRepository.save(createResidentialUnitDto);
    } catch (error) {
      throw error;
    }
  }

  async getResidentialUnitById(id: string): Promise<ResidentialUnitEntity> {
    try {
      const unit = await this.residentialUnitRepository.findOneById(id);
      if (!unit) {
        throw new NotFoundException('Residential unit not found');
      }
      return unit;
    } catch (error) {
      throw error;
    }
  }

  async getResidentialUnitsByProjectId(
    projectId: string,
  ): Promise<ResidentialUnitEntity[]> {
    try {
      return await this.residentialUnitRepository.findByProjectId(projectId);
    } catch (error) {
      throw error;
    }
  }

  async updateResidentialUnit(
    id: string,
    updateResidentialUnitDto: UpdateResidentialUnitDto,
  ): Promise<ResidentialUnitEntity> {
    try {
      const unit = await this.residentialUnitRepository.findOneById(id);
      if (!unit) {
        throw new NotFoundException('Residential unit not found');
      }
      const updatedUnit = {
        ...unit,
        ...updateResidentialUnitDto,
        id: unit.id,
      };
      return await this.residentialUnitRepository.save(updatedUnit);
    } catch (error) {
      throw error;
    }
  }

  // Commercial Unit Methods
  async createCommercialUnit(
    createCommercialUnitDto: CreateCommercialUnitDto,
  ): Promise<CommercialUnitEntity> {
    try {
      // Verify project exists
      const project = await this.projectRepository.findOneById(
        createCommercialUnitDto.project_id,
      );
      if (!project) {
        throw new NotFoundException('Project not found');
      }
      return await this.commercialUnitRepository.save(createCommercialUnitDto);
    } catch (error) {
      throw error;
    }
  }

  async getCommercialUnitById(id: string): Promise<CommercialUnitEntity> {
    try {
      const unit = await this.commercialUnitRepository.findOneById(id);
      if (!unit) {
        throw new NotFoundException('Commercial unit not found');
      }
      return unit;
    } catch (error) {
      throw error;
    }
  }

  async getCommercialUnitsByProjectId(
    projectId: string,
  ): Promise<CommercialUnitEntity[]> {
    try {
      return await this.commercialUnitRepository.findByProjectId(projectId);
    } catch (error) {
      throw error;
    }
  }

  async updateCommercialUnit(
    id: string,
    updateCommercialUnitDto: UpdateCommercialUnitDto,
  ): Promise<CommercialUnitEntity> {
    try {
      const unit = await this.commercialUnitRepository.findOneById(id);
      if (!unit) {
        throw new NotFoundException('Commercial unit not found');
      }
      const updatedUnit = {
        ...unit,
        ...updateCommercialUnitDto,
        id: unit.id,
      };
      return await this.commercialUnitRepository.save(updatedUnit);
    } catch (error) {
      throw error;
    }
  }

  // Land Plot Methods
  async createLandPlot(
    createLandPlotDto: CreateLandPlotDto,
  ): Promise<LandPlotEntity> {
    try {
      // Verify project exists
      const project = await this.projectRepository.findOneById(
        createLandPlotDto.project_id,
      );
      if (!project) {
        throw new NotFoundException('Project not found');
      }
      return await this.landPlotRepository.save(createLandPlotDto);
    } catch (error) {
      throw error;
    }
  }

  async getLandPlotById(id: string): Promise<LandPlotEntity> {
    try {
      const plot = await this.landPlotRepository.findOneById(id);
      if (!plot) {
        throw new NotFoundException('Land plot not found');
      }
      return plot;
    } catch (error) {
      throw error;
    }
  }

  async getLandPlotsByProjectId(projectId: string): Promise<LandPlotEntity[]> {
    try {
      return await this.landPlotRepository.findByProjectId(projectId);
    } catch (error) {
      throw error;
    }
  }

  async updateLandPlot(
    id: string,
    updateLandPlotDto: UpdateLandPlotDto,
  ): Promise<LandPlotEntity> {
    try {
      const plot = await this.landPlotRepository.findOneById(id);
      if (!plot) {
        throw new NotFoundException('Land plot not found');
      }
      const updatedPlot = {
        ...plot,
        ...updateLandPlotDto,
        id: plot.id,
      };
      return await this.landPlotRepository.save(updatedPlot);
    } catch (error) {
      throw error;
    }
  }

  // Unit Floor Plan Methods
  async createUnitFloorPlan(
    createUnitFloorPlanDto: CreateUnitFloorPlanDto,
  ): Promise<UnitFloorPlanEntity> {
    try {
      // Verify that at least one of the unit IDs is provided
      if (
        !createUnitFloorPlanDto.residential_unit_id &&
        !createUnitFloorPlanDto.commercial_unit_id &&
        !createUnitFloorPlanDto.land_plot_id
      ) {
        throw new Error(
          'At least one of residential_unit_id, commercial_unit_id, or land_plot_id must be provided',
        );
      }

      // Verify that the unit exists if an ID is provided
      if (createUnitFloorPlanDto.residential_unit_id) {
        const unit = await this.residentialUnitRepository.findOneById(
          createUnitFloorPlanDto.residential_unit_id,
        );
        if (!unit) {
          throw new NotFoundException('Residential unit not found');
        }
      }

      if (createUnitFloorPlanDto.commercial_unit_id) {
        const unit = await this.commercialUnitRepository.findOneById(
          createUnitFloorPlanDto.commercial_unit_id,
        );
        if (!unit) {
          throw new NotFoundException('Commercial unit not found');
        }
      }

      if (createUnitFloorPlanDto.land_plot_id) {
        const plot = await this.landPlotRepository.findOneById(
          createUnitFloorPlanDto.land_plot_id,
        );
        if (!plot) {
          throw new NotFoundException('Land plot not found');
        }
      }

      return await this.unitFloorPlanRepository.save(createUnitFloorPlanDto);
    } catch (error) {
      throw error;
    }
  }

  async getUnitFloorPlanById(id: string): Promise<UnitFloorPlanEntity> {
    try {
      const floorPlan = await this.unitFloorPlanRepository.findOneById(id);
      if (!floorPlan) {
        throw new NotFoundException('Unit floor plan not found');
      }
      return floorPlan;
    } catch (error) {
      throw error;
    }
  }

  async getUnitFloorPlansByResidentialUnitId(
    unitId: string,
  ): Promise<UnitFloorPlanEntity[]> {
    try {
      return await this.unitFloorPlanRepository.findByResidentialUnitId(unitId);
    } catch (error) {
      throw error;
    }
  }

  async getUnitFloorPlansByCommercialUnitId(
    unitId: string,
  ): Promise<UnitFloorPlanEntity[]> {
    try {
      return await this.unitFloorPlanRepository.findByCommercialUnitId(unitId);
    } catch (error) {
      throw error;
    }
  }

  async getUnitFloorPlansByLandPlotId(
    plotId: string,
  ): Promise<UnitFloorPlanEntity[]> {
    try {
      return await this.unitFloorPlanRepository.findByLandPlotId(plotId);
    } catch (error) {
      throw error;
    }
  }

  async updateUnitFloorPlan(
    id: string,
    updateUnitFloorPlanDto: UpdateUnitFloorPlanDto,
  ): Promise<UnitFloorPlanEntity> {
    try {
      const floorPlan = await this.unitFloorPlanRepository.findOneById(id);
      if (!floorPlan) {
        throw new NotFoundException('Unit floor plan not found');
      }
      const updatedFloorPlan = {
        ...floorPlan,
        ...updateUnitFloorPlanDto,
        id: floorPlan.id,
      };
      return await this.unitFloorPlanRepository.save(updatedFloorPlan);
    } catch (error) {
      throw error;
    }
  }
}
