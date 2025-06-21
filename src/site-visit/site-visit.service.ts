import { Inject, Injectable } from '@nestjs/common';
import { SiteVisitRepositoryInterface } from '../db/interfaces/site-visit.interface';
import { CreateSiteVisitDto } from './dto/create-site-visit.dto';
import { UpdateSiteVisitDto } from './dto/update-site-visit.dto';

@Injectable()
export class SiteVisitService {
  constructor(
    @Inject('siteVisitRepositoryInterface')
    private readonly siteVisitRepository: SiteVisitRepositoryInterface,
  ) {}

  create(createSiteVisitDto: CreateSiteVisitDto) {
    return this.siteVisitRepository.create(createSiteVisitDto);
  }

  findAll() {
    return this.siteVisitRepository.findAll();
  }

  findOne(id: string) {
    return this.siteVisitRepository.findByCondition({ where: { id } });
  }

  update(id: number, updateSiteVisitDto: UpdateSiteVisitDto) {
    return `This action updates a #${id} siteVisit`;
  }

  remove(id: number) {
    return `This action removes a #${id} siteVisit`;
  }
}
