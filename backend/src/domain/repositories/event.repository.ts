/* eslint-disable prettier/prettier */
import { Event } from '@prisma/client';
import { IUpdateEventDto } from '../dto/updateEventDto';

export abstract class EventRepository {
  abstract getByOpenStatus(): Promise<Event[]>;
  abstract updateEvent(id: string, data: IUpdateEventDto): Promise<Event>;
  abstract deleteEvent(id: string): Promise<void>;
}
