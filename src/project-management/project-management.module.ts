import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BuilderModule } from '../builder/builder.module';
import { CityModule } from '../city/city.module';
import { ProjectEntity } from '../db/entities/project.entity';
import { ProjectRepository } from '../db/repositories/project.repository';
import { ProjectManagementController } from './project-management.controller';
import { ProjectManagementService } from './project-management.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProjectEntity]),
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
  ],
})
export class ProjectManagementModule {}
