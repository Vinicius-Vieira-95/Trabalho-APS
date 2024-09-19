/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { EventosService } from './open-events.service';
import { EventosController } from './open-events.controller';
import { PrismaService } from '../../infra/database/prisma/prisma.service';

@Module({
  controllers: [EventosController],
  providers: [EventosService, PrismaService],
})
export class OpenEventsModule {}
