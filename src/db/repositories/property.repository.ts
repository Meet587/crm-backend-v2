import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PropertyEntity } from '../entities/property.entity';
import { PropertyRepositoryInterface } from '../interfaces/property.interface';
import { BaseAbstractRepository } from './base/base.abstract.repository';

export class PropertyRepository
  extends BaseAbstractRepository<PropertyEntity>
  implements PropertyRepositoryInterface
{
  constructor(
    @InjectRepository(PropertyEntity)
    private readonly propertyRepository: Repository<PropertyEntity>,
  ) {
    super(propertyRepository);
  }
}
