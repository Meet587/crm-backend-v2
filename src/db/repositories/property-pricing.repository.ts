import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PropertyPricingEntity } from '../entities/property-pricing.entity';
import { PropertyPricingRepositoryInterface } from '../interfaces/property-pricing.interface';
import { BaseAbstractRepository } from './base/base.abstract.repository';

export class PropertyPricingRepository
  extends BaseAbstractRepository<PropertyPricingEntity>
  implements PropertyPricingRepositoryInterface
{
  constructor(
    @InjectRepository(PropertyPricingEntity)
    private readonly propertyPricingRepository: Repository<PropertyPricingEntity>,
  ) {
    super(propertyPricingRepository);
  }
}
