/* eslint-disable prettier/prettier */
import { Event, EventStatus } from '@prisma/client';
import { IUpdateEventDto } from '../dto/updateEventDto';

export abstract class EventRepository {
  abstract getByOpenStatus(): Promise<Event[]>;
  abstract getByInProgressStatus(): Promise<Event[]>;
  abstract findById(id: string): Promise<Event>;
  abstract updateStatusById({
    id,
    status,
  }: {
    id: string;
    status: EventStatus;
  }): Promise<Event>;
  abstract updateEvent(id: string, data: IUpdateEventDto): Promise<Event>;
  abstract deleteEvent(id: string): Promise<void>;
}
