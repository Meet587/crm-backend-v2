import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { DealRepositoryInterface } from '../db/interfaces/deal.interface';
import { CreateDealDto } from './dto/create-deal.dto';
import { UpdateDealDto } from './dto/update-deal.dto';

@Injectable()
export class DealService {
  constructor(
    @Inject('dealRepositoryInterface')
    private readonly dealRepository: DealRepositoryInterface,
  ) {}

  async createDeal(createDealDto: CreateDealDto) {
    try {
      return await this.dealRepository.save(createDealDto);
    } catch (error) {
      throw error;
    }
  }

  async getDealById(id: string) {
    try {
      const deal = await this.dealRepository.findOneById(id);
      if (!deal) {
        throw new NotFoundException('Deal not found');
      }
      return deal;
    } catch (error) {
      throw error;
    }
  }

  async getAllDeals() {
    try {
      return await this.dealRepository.findAll();
    } catch (error) {
      throw error;
    }
  }

  async updateDeal(id: string, updateDealDto: UpdateDealDto) {
    try {
      const deal = await this.getDealById(id);
      const updateDate = {
        ...deal,
        ...updateDealDto,
        id: deal.id,
      };
      return await this.dealRepository.save(updateDate);
    } catch (error) {
      throw error;
    }
  }

  async deleteDeal(id: string) {
    try {
      const deal = await this.getDealById(id);
      return await this.dealRepository.remove(deal);
    } catch (error) {
      throw error;
    }
  }
}
