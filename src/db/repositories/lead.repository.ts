import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LeadEntity } from '../entities/lead.entity';
import { LeadInterface } from '../interfaces/lead.interface';
import { BaseAbstractRepository } from './base/base.abstract.repository';

@Injectable()
export class LeadRepository
  extends BaseAbstractRepository<LeadEntity>
  implements LeadInterface
{
  constructor(
    @InjectRepository(LeadEntity)
    private readonly leadRepository: Repository<LeadEntity>,
  ) {
    super(leadRepository);
  }
}
