import { ClientEntity } from '../entities/client.entity';
import { BaseInterfaceRepository } from '../repositories/base/base.interface.repository';

export interface ClientRepositoryInterface
  extends BaseInterfaceRepository<ClientEntity> {}
