import { InjectRepository } from '@nestjs/typeorm';
import { AmenitiesEntity } from 'src/db/entities/amenities.entity';
import { AmenitiesRepositoryInterface } from 'src/db/interfaces/amenities.interface';
import { Repository } from 'typeorm';
import { BaseAbstractRepository } from './base/base.abstract.repository';

export class AmenitiesRepository
  extends BaseAbstractRepository<AmenitiesEntity>
  implements AmenitiesRepositoryInterface
{
  constructor(
    @InjectRepository(AmenitiesEntity)
    private readonly amenitiesRepository: Repository<AmenitiesEntity>,
  ) {
    super(amenitiesRepository);
  }
}
