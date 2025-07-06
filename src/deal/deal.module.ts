import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DealEntity } from '../db/entities/deal.entity';
import { DealRepository } from '../db/repositories/deal.repository';
import { DealController } from './deal.controller';
import { DealService } from './deal.service';

@Module({
  imports: [TypeOrmModule.forFeature([DealEntity])],
  controllers: [DealController],
  providers: [
    DealService,
    {
      provide: 'dealRepositoryInterface',
      useClass: DealRepository,
    },
  ],
})
export class DealModule {}
