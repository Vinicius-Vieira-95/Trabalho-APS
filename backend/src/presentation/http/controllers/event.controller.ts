/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Res,
} from '@nestjs/common';
import { EventService } from '@/application/event/event.service';
import { UpdateEventDto } from '@/domain/dto/updateEventDto';
import { Response } from 'express';

@Controller('events')
export class EventController {
  constructor(private readonly eventsService: EventService) {}

  @Get('open')
  async findOpenEvents() {
    return await this.eventsService.findOpenEvents();
  }

  @Patch(':id')
  async updateEvent(@Body() body: UpdateEventDto, @Param('id') id: string) {
    return await this.eventsService.updateEvent(id, body);
  }

  @Delete(':id')
  async deleteEvent(@Param('id') id: string, @Res() response: Response) {
    await this.eventsService.deleteEvent(id);

    return response.status(204).send();
  }
}
