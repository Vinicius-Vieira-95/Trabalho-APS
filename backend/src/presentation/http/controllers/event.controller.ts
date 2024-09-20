/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';
import {EventService} from "@/application/event/event.service"

@Controller('events')
export class EventController {
  constructor(private readonly eventsService: EventService) {}

  @Get('open')
  async findOpenEvents() {
    return await this.eventsService.findOpenEvents();
  }
}
