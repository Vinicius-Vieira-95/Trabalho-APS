import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { EventRepository } from '@/domain/repositories/event.repository';
import { ICreateEventDto } from '@/domain/dto/createEventDto';
import { Event, EventStatus } from '@prisma/client';

@Injectable()
export class PrismaEventRepository implements EventRepository {
  constructor(private prisma: PrismaService) {}
  async updateStatusById({
    id,
    status,
  }: {
    id: string;
    status: EventStatus;
  }): Promise<Event> {
    return await this.prisma.event.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });
  }

  async findById(id: string): Promise<Event> {
    return await this.prisma.event.findFirst({
      where: {
        id,
      },
    });
  }

  async getByInProgressStatus(): Promise<Event[]> {
    return await this.prisma.event.findMany({
      where: {
        status: 'IN_PROGRESS',
      },
    });
  }

  async create(data: ICreateEventDto): Promise<Event> {
    return await this.prisma.event.create({
      data,
    });
  }

  async getByOpenStatus(): Promise<Event[]> {
    return await this.prisma.event.findMany({
      where: {
        status: 'OPEN',
      },
    });
  }
}
