import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { LeadSourceEntity } from '../db/entities/lead-source.entity';
import { LeadSourceRepositoryInterface } from '../db/interfaces/lead-source.interface';
import {
  CreateLeadSourceDto,
  UpdateLeadSourceDto,
} from './dto/create-lead-source.dto';

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

  async findById(id: string) {
    try {
      const source = await this.leadSourceRepository.findOneById(id);
      if (!source) {
        throw new NotFoundException('Lead source not found');
      }
      return source;
    } catch (error) {
      throw error;
    }
  }

  async updateLeadSource(id: string, updateLeadSourceDto: UpdateLeadSourceDto) {
    try {
      const source = await this.findById(id);
      Object.assign(source, updateLeadSourceDto);
      return this.leadSourceRepository.save(source);
    } catch (error) {
      throw error;
    }
  }

  async deleteLeadSource(id: string) {
    try {
      const source = await this.findById(id);
      await this.leadSourceRepository.remove(source);
      return true;
    } catch (error) {
      throw error;
    }
  }
}
