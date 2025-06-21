import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SiteVisitEntity } from '../entities/site-visit.entity';
import { SiteVisitRepositoryInterface } from '../interfaces/site-visit.interface';
import { BaseAbstractRepository } from './base/base.abstract.repository';

export class SiteVisitRepository
  extends BaseAbstractRepository<SiteVisitEntity>
  implements SiteVisitRepositoryInterface
{
  constructor(
    @InjectRepository(SiteVisitEntity)
    private readonly siteVisitRepository: Repository<SiteVisitEntity>,
  ) {
    super(siteVisitRepository);
  }
}
