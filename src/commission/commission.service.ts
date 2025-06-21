import { Inject, Injectable } from '@nestjs/common';
import { CommissionRepositoryInterface } from '../db/interfaces/commission.interface';
import { CreateCommissionDto } from './dto/create-commission.dto';
import { UpdateCommissionDto } from './dto/update-commission.dto';

@Injectable()
export class CommissionService {
  constructor(
    @Inject('commissionRepositoryInterface')
    private readonly commissionRepository: CommissionRepositoryInterface,
  ) {}

  create(createCommissionDto: CreateCommissionDto) {
    return this.commissionRepository.create(createCommissionDto);
  }

  findAll() {
    return this.commissionRepository.findAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} commission`;
  }

  update(id: number, updateCommissionDto: UpdateCommissionDto) {
    return `This action updates a #${id} commission`;
  }

  remove(id: number) {
    return `This action removes a #${id} commission`;
  }
}
