import { Test, TestingModule } from '@nestjs/testing';
import { SiteVisitService } from './site-visit.service';

describe('SiteVisitService', () => {
  let service: SiteVisitService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SiteVisitService],
    }).compile();

    service = module.get<SiteVisitService>(SiteVisitService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
