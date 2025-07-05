import { LeadSourceEntity } from '../entities/lead-source.entity';
import { BaseInterfaceRepository } from '../repositories/base/base.interface.repository';

export interface LeadSourceRepositoryInterface
  extends BaseInterfaceRepository<LeadSourceEntity> {}
