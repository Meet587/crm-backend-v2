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

  async updateActivity(
    activityId: string,
    updateActivityDto: UpdateActivityDto,
  ): Promise<LeadActivityEntity> {
    const activity = await this.leadActivityRepository.findByCondition({
      where: { id: activityId },
    });

    if (!activity) {
      throw new NotFoundException(`Activity with ID ${activityId} not found`);
    }

    Object.assign(activity, updateActivityDto);

    return this.leadActivityRepository.save(activity);
  }
}
