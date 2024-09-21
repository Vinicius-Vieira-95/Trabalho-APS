/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { EventRepository } from '@/domain/repositories/event.repository';
import { IUpdateEventDto } from '@/domain/dto/updateEventDto';

@Injectable()
export class EventService {
  constructor(private eventRepository: EventRepository) {}

  async findOpenEvents() {
    return await this.eventRepository.getByOpenStatus();
  }

  async updateEvent(id: string, data: IUpdateEventDto) {
    return await this.eventRepository.updateEvent(id, data);
  }

  async deleteEvent(id: string) {
    return await this.eventRepository.deleteEvent(id);
  }
}
