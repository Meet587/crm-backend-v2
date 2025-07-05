import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LeadSourceEntity } from '../entities/lead-source.entity';
import { LeadSourceRepositoryInterface } from '../interfaces/lead-source.interface';
import { BaseAbstractRepository } from './base/base.abstract.repository';

export class LeadSourceRepository
  extends BaseAbstractRepository<LeadSourceEntity>
  implements LeadSourceRepositoryInterface
{
  constructor(
    @InjectRepository(LeadSourceEntity)
    private readonly leadSourceRepository: Repository<LeadSourceEntity>,
  ) {
    super(leadSourceRepository);
  }
}
