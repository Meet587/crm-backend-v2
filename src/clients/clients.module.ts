import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientEntity } from '../db/entities/client.entity';
import { ClientRepository } from '../db/repositories/client.repository';
import { ClientsController } from './clients.controller';
import { ClientsService } from './clients.service';

@Module({
  imports: [TypeOrmModule.forFeature([ClientEntity])],
  controllers: [ClientsController],
  providers: [
    ClientsService,
    {
      provide: 'clientRepositoryInterface',
      useClass: ClientRepository,
    },
  ],
  exports: [ClientsService],
})
export class ClientsModule {}
