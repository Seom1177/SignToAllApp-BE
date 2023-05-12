import { Test, TestingModule } from '@nestjs/testing';
import { ActivityByUserService } from './activity-by-user.service';

describe('ActivityByUserService', () => {
  let service: ActivityByUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ActivityByUserService],
    }).compile();

    service = module.get<ActivityByUserService>(ActivityByUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
