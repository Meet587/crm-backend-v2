import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropertyExtraChargeEntity } from 'src/db/entities/property-extra-charge.entity';
import { PropertyFurnitureDetailsEntity } from 'src/db/entities/property-furniture.entity';
import { PropertyPricingEntity } from 'src/db/entities/property-pricing.entity';
import { PropertyUploadEntity } from 'src/db/entities/property-upload.entity';
import { PropertyExtraChargeRepository } from 'src/db/repositories/property-extra-charge.repository';
import { PropertyFurnitureRepository } from 'src/db/repositories/property-furniture.repository';
import { PropertyPricingRepository } from 'src/db/repositories/property-pricing.repository';
import { PropertyUploadRepository } from 'src/db/repositories/property-upload.repository';
import { PropertyEntity } from '../db/entities/property.entity';
import { PropertyRepository } from '../db/repositories/property.repository';
import { PropertyManagementController } from './property-management.controller';
import { PropertyManagementService } from './property-management.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PropertyEntity,
      PropertyUploadEntity,
      PropertyPricingEntity,
      PropertyFurnitureDetailsEntity,
      PropertyExtraChargeEntity,
    ]),
  ],
  controllers: [PropertyManagementController],
  providers: [
    PropertyManagementService,
    {
      provide: 'propertyRepositoryInterface',
      useClass: PropertyRepository,
    },
    {
      provide: 'propertyExtraChargeRepositoryInterface',
      useClass: PropertyExtraChargeRepository,
    },
    {
      provide: 'propertyFurnitureRepositoryInterface',
      useClass: PropertyFurnitureRepository,
    },
    {
      provide: 'propertyPricingRepositoryInterface',
      useClass: PropertyPricingRepository,
    },
    {
      provide: 'propertyUploadRepositoryInterface',
      useClass: PropertyUploadRepository,
    },
  ],
  exports: [PropertyManagementService],
})
export class PropertyManagementModule {}
