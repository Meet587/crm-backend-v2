import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BuilderEntity } from '../entities/builder.entity';
import { BuilderRepositoryInterface } from '../interfaces/builder.interface';
import { BaseAbstractRepository } from './base/base.abstract.repository';

export class BuilderRepository
  extends BaseAbstractRepository<BuilderEntity>
  implements BuilderRepositoryInterface
{
  constructor(
    @InjectRepository(BuilderEntity)
    private readonly builderRepository: Repository<BuilderEntity>,
  ) {
    super(builderRepository);
  }
}
