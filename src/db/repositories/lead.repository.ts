import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LeadEntity } from '../entities/lead.entity';
import { LeadRepositoryInterface } from '../interfaces/lead.interface';
import { BaseAbstractRepository } from './base/base.abstract.repository';

export class LeadRepository
  extends BaseAbstractRepository<LeadEntity>
  implements LeadRepositoryInterface
{
  constructor(
    @InjectRepository(LeadEntity)
    private readonly leadRepository: Repository<LeadEntity>,
  ) {
    super(leadRepository);
  }
}
