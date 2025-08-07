import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectEntity } from '../entities/project.entity';
import { ResidentialUnitEntity } from '../entities/residential-unit.entity';
import { CommercialUnitEntity } from '../entities/commercial-unit.entity';
import { LandPlotEntity } from '../entities/land-plot.entity';
import { UnitFloorPlanEntity } from '../entities/unit-floor-plan.entity';
import {
  ProjectRepositoryInterface,
  ResidentialUnitRepositoryInterface,
  CommercialUnitRepositoryInterface,
  LandPlotRepositoryInterface,
  UnitFloorPlanRepositoryInterface,
} from '../interfaces/project.interface';
import { BaseAbstractRepository } from './base/base.abstract.repository';

export class ProjectRepository
  extends BaseAbstractRepository<ProjectEntity>
  implements ProjectRepositoryInterface
{
  constructor(
    @InjectRepository(ProjectEntity)
    private readonly projectRepository: Repository<ProjectEntity>,
  ) {
    super(projectRepository);
  }
}

export class ResidentialUnitRepository
  extends BaseAbstractRepository<ResidentialUnitEntity>
  implements ResidentialUnitRepositoryInterface
{
  constructor(
    @InjectRepository(ResidentialUnitEntity)
    private readonly residentialUnitRepository: Repository<ResidentialUnitEntity>,
  ) {
    super(residentialUnitRepository);
  }

  async findByProjectId(projectId: string): Promise<ResidentialUnitEntity[]> {
    return this.residentialUnitRepository.find({
      where: { project_id: projectId },
    });
  }
}

export class CommercialUnitRepository
  extends BaseAbstractRepository<CommercialUnitEntity>
  implements CommercialUnitRepositoryInterface
{
  constructor(
    @InjectRepository(CommercialUnitEntity)
    private readonly commercialUnitRepository: Repository<CommercialUnitEntity>,
  ) {
    super(commercialUnitRepository);
  }

  async findByProjectId(projectId: string): Promise<CommercialUnitEntity[]> {
    return this.commercialUnitRepository.find({
      where: { project_id: projectId },
    });
  }
}

export class LandPlotRepository
  extends BaseAbstractRepository<LandPlotEntity>
  implements LandPlotRepositoryInterface
{
  constructor(
    @InjectRepository(LandPlotEntity)
    private readonly landPlotRepository: Repository<LandPlotEntity>,
  ) {
    super(landPlotRepository);
  }

  async findByProjectId(projectId: string): Promise<LandPlotEntity[]> {
    return this.landPlotRepository.find({
      where: { project_id: projectId },
    });
  }
}

export class UnitFloorPlanRepository
  extends BaseAbstractRepository<UnitFloorPlanEntity>
  implements UnitFloorPlanRepositoryInterface
{
  constructor(
    @InjectRepository(UnitFloorPlanEntity)
    private readonly unitFloorPlanRepository: Repository<UnitFloorPlanEntity>,
  ) {
    super(unitFloorPlanRepository);
  }

  async findByResidentialUnitId(unitId: string): Promise<UnitFloorPlanEntity[]> {
    return this.unitFloorPlanRepository.find({
      where: { residential_unit_id: unitId },
    });
  }

  async findByCommercialUnitId(unitId: string): Promise<UnitFloorPlanEntity[]> {
    return this.unitFloorPlanRepository.find({
      where: { commercial_unit_id: unitId },
    });
  }

  async findByLandPlotId(plotId: string): Promise<UnitFloorPlanEntity[]> {
    return this.unitFloorPlanRepository.find({
      where: { land_plot_id: plotId },
    });
  }
}
