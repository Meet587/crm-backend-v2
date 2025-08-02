import { ProjectEntity } from '../entities/project.entity';
import { ResidentialUnitEntity } from '../entities/residential-unit.entity';
import { CommercialUnitEntity } from '../entities/commercial-unit.entity';
import { LandPlotEntity } from '../entities/land-plot.entity';
import { UnitFloorPlanEntity } from '../entities/unit-floor-plan.entity';
import { BaseInterfaceRepository } from '../repositories/base/base.interface.repository';

export interface ProjectRepositoryInterface
  extends BaseInterfaceRepository<ProjectEntity> {
  // Additional project-specific methods can be added here
}

export interface ResidentialUnitRepositoryInterface
  extends BaseInterfaceRepository<ResidentialUnitEntity> {
  findByProjectId(projectId: string): Promise<ResidentialUnitEntity[]>;
}

export interface CommercialUnitRepositoryInterface
  extends BaseInterfaceRepository<CommercialUnitEntity> {
  findByProjectId(projectId: string): Promise<CommercialUnitEntity[]>;
}

export interface LandPlotRepositoryInterface
  extends BaseInterfaceRepository<LandPlotEntity> {
  findByProjectId(projectId: string): Promise<LandPlotEntity[]>;
}

export interface UnitFloorPlanRepositoryInterface
  extends BaseInterfaceRepository<UnitFloorPlanEntity> {
  findByResidentialUnitId(unitId: string): Promise<UnitFloorPlanEntity[]>;
  findByCommercialUnitId(unitId: string): Promise<UnitFloorPlanEntity[]>;
  findByLandPlotId(plotId: string): Promise<UnitFloorPlanEntity[]>;
}
