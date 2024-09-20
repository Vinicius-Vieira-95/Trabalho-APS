/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { EventRepository } from '@/domain/repositories/event.repository';

@Injectable()
export class EventService {
  constructor(private eventRepository: EventRepository) {}

  async findOpenEvents() {
     return await this.eventRepository.getByOpenStatus(); 
  }
}
