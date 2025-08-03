import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AmenitiesRepository } from 'src/db/repositories/amenities.repository';
import { BuilderModule } from '../builder/builder.module';
import { CityModule } from '../city/city.module';
import { CommercialUnitEntity } from '../db/entities/commercial-unit.entity';
import { LandPlotEntity } from '../db/entities/land-plot.entity';
import { ProjectEntity } from '../db/entities/project.entity';
import { ResidentialUnitEntity } from '../db/entities/residential-unit.entity';
import { UnitFloorPlanEntity } from '../db/entities/unit-floor-plan.entity';
import {
  CommercialUnitRepository,
  LandPlotRepository,
  ProjectRepository,
  ResidentialUnitRepository,
  UnitFloorPlanRepository,
} from '../db/repositories/project.repository';
import { AmenitiesEntity } from './../db/entities/amenities.entity';
import { ProjectManagementController } from './project-management.controller';
import { ProjectManagementService } from './project-management.service';
import { ProjectUnitTypeService } from './project-unit-type.service';
import { ProjectUnitTypeController } from './project-unit-type.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProjectEntity,
      AmenitiesEntity,
      ResidentialUnitEntity,
      CommercialUnitEntity,
      LandPlotEntity,
      UnitFloorPlanEntity,
    ]),
    BuilderModule,
    CityModule,
  ],
  controllers: [ProjectManagementController, ProjectUnitTypeController],
  providers: [
    ProjectManagementService,
    ProjectUnitTypeService,
    {
      provide: 'projectRepositoryInterface',
      useClass: ProjectRepository,
    },
    {
      provide: 'residentialUnitRepositoryInterface',
      useClass: ResidentialUnitRepository,
    },
    {
      provide: 'commercialUnitRepositoryInterface',
      useClass: CommercialUnitRepository,
    },
    {
      provide: 'landPlotRepositoryInterface',
      useClass: LandPlotRepository,
    },
    {
      provide: 'unitFloorPlanRepositoryInterface',
      useClass: UnitFloorPlanRepository,
    },
    {
      provide: 'amenitiesRepositoryInterface',
      useClass: AmenitiesRepository,
    },
  ],
  exports: [ProjectManagementService],
})
export class ProjectManagementModule {}
