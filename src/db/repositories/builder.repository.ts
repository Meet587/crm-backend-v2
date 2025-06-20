import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BuilderEntity } from '../entities/builder.entity';
import { BuilderInterface } from '../interfaces/builder.interface';
import { BaseAbstractRepository } from './base/base.abstract.repository';

@Injectable()
export class BuilderRepository
  extends BaseAbstractRepository<BuilderEntity>
  implements BuilderInterface
{
  constructor(
    @InjectRepository(BuilderEntity)
    private readonly builderRepository: Repository<BuilderEntity>,
  ) {
    super(builderRepository);
  }
}
