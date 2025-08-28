import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PropertyUploadEntity } from '../entities/property-upload.entity';
import { PropertyUploadRepositoryInterface } from '../interfaces/property-upload.interface';
import { BaseAbstractRepository } from './base/base.abstract.repository';

export class PropertyUploadRepository
  extends BaseAbstractRepository<PropertyUploadEntity>
  implements PropertyUploadRepositoryInterface
{
  constructor(
    @InjectRepository(PropertyUploadEntity)
    private readonly propertyUploadRepository: Repository<PropertyUploadEntity>,
  ) {
    super(propertyUploadRepository);
  }
}
