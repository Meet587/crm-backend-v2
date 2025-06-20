import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PropertyEntity } from '../entities/property.entity';
import { PropertyInterface } from '../interfaces/property.interface';
import { BaseAbstractRepository } from './base/base.abstract.repository';

@Injectable()
export class PropertyRepository
  extends BaseAbstractRepository<PropertyEntity>
  implements PropertyInterface
{
  constructor(
    @InjectRepository(PropertyEntity)
    private readonly propertyRepository: Repository<PropertyEntity>,
  ) {
    super(propertyRepository);
  }
}
