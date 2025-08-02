import { AmenitiesEntity } from 'src/db/entities/amenities.entity';
import { BaseInterfaceRepository } from '../repositories/base/base.interface.repository';

export interface AmenitiesRepositoryInterface
  extends BaseInterfaceRepository<AmenitiesEntity> {}
