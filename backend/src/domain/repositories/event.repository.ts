import { Event, EventStatus } from '@prisma/client';

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
}
