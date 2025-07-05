import { Inject, Injectable } from '@nestjs/common';
import { LeadSourceEntity } from '../db/entities/lead-source.entity';
import { LeadSourceRepositoryInterface } from '../db/interfaces/lead-source.interface';
import { CreateLeadSourceDto } from './dto/create-lead-source.dto';

@Injectable()
export class LeadSourceService {
  constructor(
    @Inject('leadSourceRepositoryInterface')
    private readonly leadSourceRepository: LeadSourceRepositoryInterface,
  ) {}

  async getAllLeadSources(): Promise<LeadSourceEntity[]> {
    try {
      return this.leadSourceRepository.findAll({
        where: { is_active: true },
      });
    } catch (error) {
      throw error;
    }
  }

  async createLeadSource(
    createLeadSourceDto: CreateLeadSourceDto,
  ): Promise<LeadSourceEntity> {
    try {
      return this.leadSourceRepository.save(createLeadSourceDto);
    } catch (error) {
      throw error;
    }
  }
}
