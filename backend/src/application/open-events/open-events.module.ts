/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { EventsService } from './open-events.service';
import { EventsController } from './open-events.controller';
import { PrismaService } from '../../infra/database/prisma/prisma.service';

@Module({
  controllers: [EventsController],
  providers: [EventsService, PrismaService],
})
export class OpenEventsModule {}
