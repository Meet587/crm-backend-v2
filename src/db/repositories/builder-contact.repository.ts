import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BuilderContactEntity } from '../entities/builder-contact.entity';
import { BuilderContactRepositoryInterface } from '../interfaces/builder-contact.interface';
import { BaseAbstractRepository } from './base/base.abstract.repository';

export class BuilderContactRepository
  extends BaseAbstractRepository<BuilderContactEntity>
  implements BuilderContactRepositoryInterface
{
  constructor(
    @InjectRepository(BuilderContactEntity)
    private readonly builderContactRepository: Repository<BuilderContactEntity>,
  ) {
    super(builderContactRepository);
  }
}
