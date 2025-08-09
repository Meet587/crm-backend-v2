import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PropertyFurnitureDetailsEntity } from '../entities/property-furniture.entity';
import { PropertyFurnitureRepositoryInterface } from '../interfaces/property-furniture.interface';
import { BaseAbstractRepository } from './base/base.abstract.repository';

export class PropertyFurnitureRepository
  extends BaseAbstractRepository<PropertyFurnitureDetailsEntity>
  implements PropertyFurnitureRepositoryInterface
{
  constructor(
    @InjectRepository(PropertyFurnitureDetailsEntity)
    private readonly propertyFurnitureRepository: Repository<PropertyFurnitureDetailsEntity>,
  ) {
    super(propertyFurnitureRepository);
  }
}
