import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DealEntity } from '../entities/deal.entity';
import { DealRepositoryInterface } from '../interfaces/deal.interface';
import { BaseAbstractRepository } from './base/base.abstract.repository';

export class DealRepository
  extends BaseAbstractRepository<DealEntity>
  implements DealRepositoryInterface
{
  constructor(
    @InjectRepository(DealEntity)
    private readonly dealRepository: Repository<DealEntity>,
  ) {
    super(dealRepository);
  }
}
