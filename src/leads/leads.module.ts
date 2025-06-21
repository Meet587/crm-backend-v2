import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule } from '../clients/clients.module';
import { LeadEntity } from '../db/entities/lead.entity';
import { LeadRepository } from '../db/repositories/lead.repository';
import { UsersModule } from '../users/users.module';
import { LeadsController } from './leads.controller';
import { LeadsService } from './leads.service';

@Module({
  imports: [TypeOrmModule.forFeature([LeadEntity]), ClientsModule, UsersModule],
  controllers: [LeadsController],
  providers: [
    LeadsService,
    {
      provide: 'leadRepositoryInterface',
      useClass: LeadRepository,
    },
  ],
})
export class LeadsModule {}
