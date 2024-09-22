/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { EventService } from '@/application/event/event.service';
import { CreateEventDto } from '@/domain/dto/createEventDto';
import { Response } from 'express';

@Controller('events')
export class EventController {
  constructor(private readonly eventsService: EventService) {}

  @Get('open')
  async findOpenEvents() {
    return await this.eventsService.findOpenEvents();
  }

  @Post()
  async create(@Body() body: CreateEventDto, @Res() response: Response) {
    try {
      const createdEvent = await this.eventsService.create(body);

      return response.status(201).send(createdEvent);
    } catch (error) {
      return response.status(error.status).send(error);
    }
  }
}
