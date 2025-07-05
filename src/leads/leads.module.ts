import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeadActivityEntity } from '../db/entities/lead-activity.entity';
import { LeadSourceEntity } from '../db/entities/lead-source.entity';
import { LeadEntity } from '../db/entities/lead.entity';
import { LeadSourceRepository } from '../db/repositories/lead-source.repository';
import { LeadActivityRepository } from '../db/repositories/lead.activity.repository';
import { LeadRepository } from '../db/repositories/lead.repository';
import { UsersModule } from '../users/users.module';
import { LeadSourceController } from './lead-source.controller';
import { LeadSourceService } from './lead-source.service';
import { LeadsActivityService } from './leads-activity.service';
import { LeadsController } from './leads.controller';
import { LeadsService } from './leads.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      LeadEntity,
      LeadActivityEntity,
      LeadSourceEntity,
    ]),
    UsersModule,
  ],
  controllers: [LeadsController, LeadSourceController],
  providers: [
    LeadsService,
    LeadsActivityService,
    LeadSourceService,
    {
      provide: 'leadRepositoryInterface',
      useClass: LeadRepository,
    },
    {
      provide: 'leadActivityRepositoryInterface',
      useClass: LeadActivityRepository,
    },
    {
      provide: 'leadSourceRepositoryInterface',
      useClass: LeadSourceRepository,
    },
  ],
})
export class LeadsModule {}
