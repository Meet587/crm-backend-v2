import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AmenitiesRepository } from 'src/db/repositories/amenities.repository';
import { BuilderModule } from '../builder/builder.module';
import { CityModule } from '../city/city.module';
import { ProjectEntity } from '../db/entities/project.entity';
import { ProjectRepository } from '../db/repositories/project.repository';
import { AmenitiesEntity } from './../db/entities/amenities.entity';
import { ProjectManagementController } from './project-management.controller';
import { ProjectManagementService } from './project-management.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProjectEntity, AmenitiesEntity]),
    BuilderModule,
    CityModule,
  ],
  controllers: [ProjectManagementController],
  providers: [
    ProjectManagementService,
    {
      provide: 'projectRepositoryInterface',
      useClass: ProjectRepository,
    },
    {
      provide: 'amenitiesRepositoryInterface',
      useClass: AmenitiesRepository,
    },
  ],
})
export class ProjectManagementModule {}
