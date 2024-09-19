/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { OpenEventsService } from './open-events.service';

describe('OpenEventsService', () => {
  let service: OpenEventsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OpenEventsService],
    }).compile();

    service = module.get<OpenEventsService>(OpenEventsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
