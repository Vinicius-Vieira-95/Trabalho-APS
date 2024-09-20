/* eslint-disable prettier/prettier */
import { Event } from '@prisma/client';

export abstract class EventRepository {
  abstract getByOpenStatus(): Promise<Event[]>;
}