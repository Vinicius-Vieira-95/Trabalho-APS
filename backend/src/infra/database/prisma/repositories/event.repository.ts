/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { EventRepository } from '@/domain/repositories/event.repository';
import { Event } from '@prisma/client';

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

  async getEventById(id: string): Promise<Event> {
    try {
      return await this.prisma.event.findUnique({ where: { id } });
    } catch (error) {
      throw new NotFoundException('Event not found');
    }
  }
}
