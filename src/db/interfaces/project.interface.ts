import { ProjectEntity } from '../entities/project.entity';
import { BaseInterfaceRepository } from '../repositories/base/base.interface.repository';

export interface ProjectRepositoryInterface
  extends BaseInterfaceRepository<ProjectEntity> {}
