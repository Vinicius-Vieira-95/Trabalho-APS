/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from '@/presentation/http/controllers/event.controller';
import { PrismaService } from '@/infra/database/prisma/prisma.service';

@Module({
  controllers: [EventController],
  providers: [EventService, PrismaService],
})
export class OpenEventsModule {}
