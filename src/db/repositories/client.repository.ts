
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientEntity } from '../entities/client.entity';
import { ClientRepositoryInterface } from '../interfaces/client.interface';
import { BaseAbstractRepository } from './base/base.abstract.repository';

export class ClientRepository
  extends BaseAbstractRepository<ClientEntity>
  implements ClientRepositoryInterface
{
  constructor(
    @InjectRepository(ClientEntity)
    private readonly clientRepository: Repository<ClientEntity>,
  ) {
    super(clientRepository);
  }
}
