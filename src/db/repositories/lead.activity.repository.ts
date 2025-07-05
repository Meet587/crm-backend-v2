import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LeadActivityEntity } from '../entities/lead-activity.entity';
import { LeadActivityRepositoryInterface } from '../interfaces/lead-activity.interface';
import { BaseAbstractRepository } from './base/base.abstract.repository';

export class LeadActivityRepository
  extends BaseAbstractRepository<LeadActivityEntity>
  implements LeadActivityRepositoryInterface
{
  constructor(
    @InjectRepository(LeadActivityEntity)
    private readonly leadActivityRepository: Repository<LeadActivityEntity>,
  ) {
    super(leadActivityRepository);
  }
}
