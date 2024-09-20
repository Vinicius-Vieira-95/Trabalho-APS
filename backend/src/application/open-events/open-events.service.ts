/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../infra/database/prisma/prisma.service';

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  async findOpenEvents() {
    return this.prisma.evento.findMany({
      where: {
        status: 'open',
      },
    });
  }
}
