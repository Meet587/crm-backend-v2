import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DealEntity } from '../entities/deal.entity';
import { DealInterface } from '../interfaces/deal.interface';
import { BaseAbstractRepository } from './base/base.abstract.repository';

@Injectable()
export class DealRepository
  extends BaseAbstractRepository<DealEntity>
  implements DealInterface
{
  constructor(
    @InjectRepository(DealEntity)
    private readonly dealRepository: Repository<DealEntity>,
  ) {
    super(dealRepository);
  }
}
