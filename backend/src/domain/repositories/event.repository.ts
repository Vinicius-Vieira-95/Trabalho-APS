/* eslint-disable prettier/prettier */
import { Event } from '@prisma/client';
import { ICreateEventDto } from '../dto/createEventDto';

export abstract class EventRepository {
  abstract getByOpenStatus(): Promise<Event[]>;
  abstract create(data: ICreateEventDto): Promise<Event>;
}
