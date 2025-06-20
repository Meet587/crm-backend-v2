import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientEntity } from '../entities/client.entity';
import { ClientInterface } from '../interfaces/client.interface';
import { BaseAbstractRepository } from './base/base.abstract.repository';

@Injectable()
export class ClientRepository
  extends BaseAbstractRepository<ClientEntity>
  implements ClientInterface
{
  constructor(
    @InjectRepository(ClientEntity)
    private readonly clientRepository: Repository<ClientEntity>,
  ) {
    super(clientRepository);
  }
}
