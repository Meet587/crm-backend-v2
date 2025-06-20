import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientEntity } from '../db/entities/client.entity';
import { LeadEntity } from '../db/entities/lead.entity';
import { UserEntity } from '../db/entities/user.entity';
import { LeadsController } from './leads.controller';
import { LeadsService } from './leads.service';

@Module({
  imports: [TypeOrmModule.forFeature([LeadEntity, UserEntity, ClientEntity])],
  controllers: [LeadsController],
  providers: [LeadsService],
})
export class LeadsModule {}
