import { PropertyEntity } from '../entities/property.entity';
import { BaseInterfaceRepository } from '../repositories/base/base.interface.repository';

export interface PropertyInterface
  extends BaseInterfaceRepository<PropertyEntity> {}
