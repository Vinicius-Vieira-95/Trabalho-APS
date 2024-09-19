/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../infra/database/prisma/prisma.service'; 
@Injectable()
export class EventosService {
  constructor(private prisma: PrismaService) {}

  async findEventosEmAberto() {
    return this.prisma.evento.findMany({
      where: {
        status: 'em aberto', 
      },
    });
  }
}
