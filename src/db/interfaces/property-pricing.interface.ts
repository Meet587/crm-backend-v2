import { PropertyPricingEntity } from '../entities/property-pricing.entity';
import { BaseInterfaceRepository } from '../repositories/base/base.interface.repository';

export interface PropertyPricingRepositoryInterface
  extends BaseInterfaceRepository<PropertyPricingEntity> {}
