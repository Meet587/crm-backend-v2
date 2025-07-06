import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CityEntity } from '../db/entities/city.entity';
import { CityRepository } from '../db/repositories/city.repository';
import { CityController } from './city.controller';
import { CityService } from './city.service';

@Module({
  imports: [TypeOrmModule.forFeature([CityEntity])],
  controllers: [CityController],
  providers: [
    CityService,
    {
      provide: 'cityRepositoryInterface',
      useClass: CityRepository,
    },
  ],
  exports: [CityService],
})
export class CityModule {}
