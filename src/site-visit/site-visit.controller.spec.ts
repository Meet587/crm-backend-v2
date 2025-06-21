import { Test, TestingModule } from '@nestjs/testing';
import { SiteVisitController } from './site-visit.controller';
import { SiteVisitService } from './site-visit.service';

describe('SiteVisitController', () => {
  let controller: SiteVisitController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SiteVisitController],
      providers: [SiteVisitService],
    }).compile();

    controller = module.get<SiteVisitController>(SiteVisitController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
