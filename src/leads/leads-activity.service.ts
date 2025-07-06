import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { LeadActivityEntity } from '../db/entities/lead-activity.entity';
import { LeadActivityRepositoryInterface } from '../db/interfaces/lead-activity.interface';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';

@Injectable()
export class LeadsActivityService {
  constructor(
    @Inject('leadActivityRepositoryInterface')
    private readonly leadActivityRepository: LeadActivityRepositoryInterface,
  ) {}

  async createActivity(
    leadId: string,
    createActivityDto: CreateActivityDto,
  ): Promise<LeadActivityEntity> {
    const activity = this.leadActivityRepository.create({
      ...createActivityDto,
      lead_id: leadId,
    });

    return this.leadActivityRepository.save(activity);
  }

  async getOne(id: string): Promise<LeadActivityEntity> {
    try {
      const activity = await this.leadActivityRepository.findOneById(id);
      if (!activity) {
        throw new NotFoundException(`Activity with ID ${id} not found`);
      }
      return activity;
    } catch (error) {
      throw error;
    }
  }

  async updateActivity(
    activityId: string,
    updateActivityDto: UpdateActivityDto,
  ): Promise<LeadActivityEntity> {
    try {
      const activity = await this.getOne(activityId);
      Object.assign(activity, updateActivityDto);
      return this.leadActivityRepository.save(activity);
    } catch (error) {
      throw error;
    }
  }
}
