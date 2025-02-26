import { Test, TestingModule } from '@nestjs/testing';
import { UsersWebinarController } from './users-webinar.controller';

describe('UsersWebinarController', () => {
  let controller: UsersWebinarController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersWebinarController],
    }).compile();

    controller = module.get<UsersWebinarController>(UsersWebinarController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
