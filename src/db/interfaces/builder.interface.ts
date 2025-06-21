import { BuilderEntity } from '../entities/builder.entity';
import { BaseInterfaceRepository } from '../repositories/base/base.interface.repository';

export interface BuilderRepositoryInterface
  extends BaseInterfaceRepository<BuilderEntity> {}
