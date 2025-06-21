import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommissionEntity } from '../db/entities/commission.entity';
import { CommissionRepository } from '../db/repositories/commission.repository';
import { CommissionController } from './commission.controller';
import { CommissionService } from './commission.service';

@Module({
  imports: [TypeOrmModule.forFeature([CommissionEntity])],
  controllers: [CommissionController],
  providers: [
    CommissionService,
    {
      provide: 'commissionRepositoryInterface',
      useClass: CommissionRepository,
    },
  ],
})
export class CommissionModule {}
