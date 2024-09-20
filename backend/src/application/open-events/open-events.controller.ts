/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';
import { EventsService } from './open-events.service';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get('open')
  async findOpenEvents() {
    return this.eventsService.findOpenEvents();
  }
}
