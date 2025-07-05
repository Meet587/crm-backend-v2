import { LeadActivityEntity } from '../entities/lead-activity.entity';
import { BaseInterfaceRepository } from '../repositories/base/base.interface.repository';

export interface LeadActivityRepositoryInterface
  extends BaseInterfaceRepository<LeadActivityEntity> {}
