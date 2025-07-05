import { LeadEntity } from '../entities/lead.entity';
import { BaseInterfaceRepository } from '../repositories/base/base.interface.repository';

export interface LeadRepositoryInterface
  extends BaseInterfaceRepository<LeadEntity> {}
