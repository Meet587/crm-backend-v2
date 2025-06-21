import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FollowUpEntity } from '../entities/follow-up.entity';
import { FollowUpRepositoryInterface } from '../interfaces/follow-up.interface';
import { BaseAbstractRepository } from './base/base.abstract.repository';

export class FollowUpRepository
  extends BaseAbstractRepository<FollowUpEntity>
  implements FollowUpRepositoryInterface
{
  constructor(
    @InjectRepository(FollowUpEntity)
    private readonly followUpRepository: Repository<FollowUpEntity>,
  ) {
    super(followUpRepository);
  }
}
