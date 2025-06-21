import { Inject, Injectable } from '@nestjs/common';
import { ClientRepositoryInterface } from '../db/interfaces/client.interface';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientsService {
  constructor(
    @Inject('clientRepositoryInterface')
    private readonly clientRepository: ClientRepositoryInterface,
  ) {}

  async create(createClientDto: CreateClientDto) {
    return await this.clientRepository.save(createClientDto);
  }

  async findAll() {
    return await this.clientRepository.findAll();
  }

  findOne(id: string) {
    return this.clientRepository.findByCondition({ where: { id } });
  }

  update(id: number, updateClientDto: UpdateClientDto) {
    return `This action updates a #${id} client`;
  }

  remove(id: number) {
    return `This action removes a #${id} client`;
  }
}
