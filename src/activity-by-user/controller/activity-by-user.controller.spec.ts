import { Test, TestingModule } from '@nestjs/testing';
import { ActivityByUserController } from './activity-by-user.controller';

describe('ActivityByUserController', () => {
  let controller: ActivityByUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ActivityByUserController],
    }).compile();

    controller = module.get<ActivityByUserController>(ActivityByUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
