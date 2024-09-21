/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { EventRepository } from '@/domain/repositories/event.repository';
import { ICreateEventDto } from '@/domain/dto/createEventDto';

@Injectable()
export class EventService {
  constructor(private eventRepository: EventRepository) {}

  async findOpenEvents() {
    return await this.eventRepository.getByOpenStatus();
  }

  async create(data: ICreateEventDto) {
    return await this.eventRepository.create(data);
  }
}
