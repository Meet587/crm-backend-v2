import { Inject, Injectable } from '@nestjs/common';
import { FollowUpRepositoryInterface } from '../db/interfaces/follow-up.interface';
import { CreateFollowUpDto } from './dto/create-follow-up.dto';
import { UpdateFollowUpDto } from './dto/update-follow-up.dto';

@Injectable()
export class FollowUpService {
  constructor(
    @Inject('followUpRepositoryInterface')
    private readonly followUpRepository: FollowUpRepositoryInterface,
  ) {}

  create(createFollowUpDto: CreateFollowUpDto) {
    return this.followUpRepository.create(createFollowUpDto);
  }

  findAll() {
    return this.followUpRepository.findAll();
  }

  findOne(id: string) {
    return this.followUpRepository.findByCondition({ where: { id } });
  }

  update(id: number, updateFollowUpDto: UpdateFollowUpDto) {
    return `This action updates a #${id} followUp`;
  }

  remove(id: number) {
    return `This action removes a #${id} followUp`;
  }
}
