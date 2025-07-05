import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectEntity } from '../entities/project.entity';
import { ProjectRepositoryInterface } from '../interfaces/project.interface';
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
