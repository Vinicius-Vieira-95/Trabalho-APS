/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { EventService } from '@/application/event/event.service';
import { CreateEventDto } from '@/domain/dto/createEventDto';
import { Response } from 'express';
import { ObjectId } from 'mongodb';

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
      const id = new ObjectId();
      const now = new Date();

      const createdEvent = await this.eventsService.create({
        ...body,
        id: id.toString(),
        createdAt: now,
        updatedAt: now,
      });

      return response.status(201).send(createdEvent);
    } catch (error) {
      return response.status(error.status).send(error);
    }
  }
}
