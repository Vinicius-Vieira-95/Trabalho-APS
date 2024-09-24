/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { EventRepository } from '@/domain/repositories/event.repository';
import { IUpdateEventDto } from '@/domain/dto/updateEventDto';
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

  async updateEvent(id: string, data: IUpdateEventDto): Promise<Event> {
    try {
      await this.prisma.event.findUnique({ where: { id } });

      const eventUpdated = await this.prisma.event.update({
        where: { id },
        data,
      });

      return eventUpdated;
    } catch (error) {
      throw new NotFoundException('Event not found');
    }
  }

  async deleteEvent(id: string): Promise<void> {
    try {
      await this.prisma.event.findUnique({ where: { id } });

      await this.prisma.event.delete({ where: { id } });
    } catch (error) {
      throw new NotFoundException('Event not found');
    }}
}
