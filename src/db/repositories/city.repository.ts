import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CityEntity } from '../entities/city.entity';
import { CityRepositoryInterface } from '../interfaces/city.interface';
import { BaseAbstractRepository } from './base/base.abstract.repository';

export class CityRepository
  extends BaseAbstractRepository<CityEntity>
  implements CityRepositoryInterface
{
  constructor(
    @InjectRepository(CityEntity)
    private readonly cityRepository: Repository<CityEntity>,
  ) {
    super(cityRepository);
  }
}
