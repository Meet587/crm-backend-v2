import { PropertyFurnitureDetailsEntity } from '../entities/property-furniture.entity';
import { BaseInterfaceRepository } from '../repositories/base/base.interface.repository';

export interface PropertyFurnitureRepositoryInterface
  extends BaseInterfaceRepository<PropertyFurnitureDetailsEntity> {}
