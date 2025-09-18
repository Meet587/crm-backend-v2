import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AmenitiesRepository } from 'src/db/repositories/amenities.repository';

import { AmenitiesEntity } from '../db/entities/amenities.entity';
import { AmenitiesController } from './amenities.controller';
import { AmenitiesService } from './amenities.service';

@Module({
  imports: [TypeOrmModule.forFeature([AmenitiesEntity])],
  controllers: [AmenitiesController],
  providers: [
    AmenitiesService,
    {
      provide: 'amenitiesRepositoryInterface',
      useClass: AmenitiesRepository,
    },
  ],
  exports: [],
})
export class AmenitiesModule {}
