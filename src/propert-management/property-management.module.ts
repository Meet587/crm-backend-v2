import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropertyEntity } from '../db/entities/property.entity';
import { PropertyRepository } from '../db/repositories/property.repository';
import { PropertyManagementController } from './property-management.controller';
import { PropertyManagementService } from './property-management.service';

@Module({
  imports: [TypeOrmModule.forFeature([PropertyEntity])],
  controllers: [PropertyManagementController],
  providers: [
    PropertyManagementService,
    {
      provide: 'propertyRepositoryInterface',
      useClass: PropertyRepository,
    },
  ],
  exports: [PropertyManagementService],
})
export class PropertyManagementModule {}
