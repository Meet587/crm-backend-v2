import { FollowUpEntity } from '../entities/follow-up.entity';
import { BaseInterfaceRepository } from '../repositories/base/base.interface.repository';

export interface FollowUpRepositoryInterface
  extends BaseInterfaceRepository<FollowUpEntity> {}
