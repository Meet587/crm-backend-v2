import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SiteVisitEntity } from '../db/entities/site-visit.entity';
import { SiteVisitRepository } from '../db/repositories/site-visit.repository';
import { SiteVisitController } from './site-visit.controller';
import { SiteVisitService } from './site-visit.service';

@Module({
  imports: [TypeOrmModule.forFeature([SiteVisitEntity])],
  controllers: [SiteVisitController],
  providers: [
    SiteVisitService,
    {
      provide: 'siteVisitRepositoryInterface',
      useClass: SiteVisitRepository,
    },
  ],
  exports: [SiteVisitService],
})
export class SiteVisitModule {}
