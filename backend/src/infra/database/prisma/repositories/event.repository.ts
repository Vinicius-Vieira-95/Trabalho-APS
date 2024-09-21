/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { EventRepository } from '@/domain/repositories/event.repository';
import { Event } from '@prisma/client';
import { IUpdateEventDto } from '@/domain/dto/updateEventDto';

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
    }
  }
}
