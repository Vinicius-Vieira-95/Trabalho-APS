/* eslint-disable prettier/prettier */
import { Controller, Get, Param, Post } from '@nestjs/common';
import { EventService } from '@/application/event/event.service';

@Controller('events')
export class EventController {
  constructor(private readonly eventsService: EventService) {}

  @Get('open')
  async findOpenEvents() {
    return await this.eventsService.findOpenEvents();
  }

  @Post(':eventId/register-user/:userId')
  async registerUserInEvent(
    @Param('eventId') eventId: string,
    @Param('userId') userId: string,
  ) {
    return await this.eventsService.registerUserInEvent({ eventId, userId });
  }
}
