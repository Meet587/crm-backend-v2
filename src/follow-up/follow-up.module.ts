import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FollowUpEntity } from '../db/entities/follow-up.entity';
import { FollowUpRepository } from '../db/repositories/follow-up.repository';
import { FollowUpController } from './follow-up.controller';
import { FollowUpService } from './follow-up.service';

@Module({
  imports: [TypeOrmModule.forFeature([FollowUpEntity])],
  controllers: [FollowUpController],
  providers: [
    FollowUpService,
    {
      provide: 'followUpRepositoryInterface',
      useClass: FollowUpRepository,
    },
  ],
})
export class FollowUpModule {}
