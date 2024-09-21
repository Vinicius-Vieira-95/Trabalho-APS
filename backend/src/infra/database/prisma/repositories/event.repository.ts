/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { EventRepository } from '@/domain/repositories/event.repository';
import { Event } from '@prisma/client';
import { ICreateEventDto } from '@/domain/dto/createEventDto';

@Injectable()
export class PrismaEventRepository implements EventRepository {
  constructor(private prisma: PrismaService) {}

  async getByOpenStatus(): Promise<Event[]> {
    return await this.prisma.event.findMany({
      where: {
        status: 'open',
      },
    });
  }

  async create(data: ICreateEventDto): Promise<Event> {
    return await this.prisma.event.create({
      data,
    });
  }
}
