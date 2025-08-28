import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SearchProjectQueryDto } from '../../project-management/dtos/search-query';
import { CommercialUnitEntity } from '../entities/commercial-unit.entity';
import { LandPlotEntity } from '../entities/land-plot.entity';
import { ProjectEntity } from '../entities/project.entity';
import { ResidentialUnitEntity } from '../entities/residential-unit.entity';
import { UnitFloorPlanEntity } from '../entities/unit-floor-plan.entity';
import {
  CommercialUnitRepositoryInterface,
  LandPlotRepositoryInterface,
  ProjectRepositoryInterface,
  ResidentialUnitRepositoryInterface,
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

  async findWithSearchAndPagination(
    searchQuery: SearchProjectQueryDto,
  ): Promise<{ data: ProjectEntity[]; total: number }> {
    const {
      page = 1,
      limit = 10,
      name,
      // property_subtypes,
      is_ready_possession,
    } = searchQuery;

    const queryBuilder = this.projectRepository
      .createQueryBuilder('project')
      .leftJoinAndSelect('project.builder', 'builder')
      .leftJoinAndSelect('project.cities', 'cities')
      .select([
        'project.id',
        'project.name',
        'project.property_types',
        'project.possession_month',
        'project.possession_year',
        'builder.id',
        'builder.name',
        'cities.id',
        'cities.name',
      ]);

    // Apply search filters
    if (name) {
      queryBuilder.andWhere('LOWER(project.name) LIKE LOWER(:name)', {
        name: `%${name}%`,
      });
    }

    // if (property_subtypes && property_subtypes.length > 0) {
    //   queryBuilder.andWhere('project.property_subtypes && :property_subtypes', {
    //     property_subtypes,
    //   });
    // }

    if (is_ready_possession !== undefined) {
      queryBuilder.andWhere(
        'project.is_ready_possession = :is_ready_possession',
        {
          is_ready_possession,
        },
      );
    }

    // Get total count
    const total = await queryBuilder.getCount();

    // Apply pagination
    const offset = (page - 1) * limit;
    queryBuilder.skip(offset).take(limit);

    // Get paginated results
    const data = await queryBuilder.getMany();

    return { data, total };
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

  async findByResidentialUnitId(
    unitId: string,
  ): Promise<UnitFloorPlanEntity[]> {
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
