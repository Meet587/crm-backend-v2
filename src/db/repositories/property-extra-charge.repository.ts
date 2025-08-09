import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PropertyExtraChargeEntity } from '../entities/property-extra-charge.entity';
import { PropertyExtraChargeRepositoryInterface } from '../interfaces/property-extra-charge.interface';
import { BaseAbstractRepository } from './base/base.abstract.repository';

export class PropertyExtraChargeRepository
  extends BaseAbstractRepository<PropertyExtraChargeEntity>
  implements PropertyExtraChargeRepositoryInterface
{
  constructor(
    @InjectRepository(PropertyExtraChargeEntity)
    private readonly propertyExtraChargeRepository: Repository<PropertyExtraChargeEntity>,
  ) {
    super(propertyExtraChargeRepository);
  }
}
