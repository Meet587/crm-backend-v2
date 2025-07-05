import { CityEntity } from '../entities/city.entity';
import { BaseInterfaceRepository } from '../repositories/base/base.interface.repository';

export interface CityRepositoryInterface
  extends BaseInterfaceRepository<CityEntity> {}
