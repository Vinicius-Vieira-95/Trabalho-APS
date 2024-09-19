/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { OpenEventsController } from './open-events.controller';

describe('OpenEventsController', () => {
  let controller: OpenEventsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OpenEventsController],
    }).compile();

    controller = module.get<OpenEventsController>(OpenEventsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
