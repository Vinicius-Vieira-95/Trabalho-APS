/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from '@/presentation/http/controllers/event.controller';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import {DatabaseModule} from "@/infra/database/database.module"

@Module({
  imports: [DatabaseModule],
  controllers: [EventController],
  providers: [EventService, PrismaService],
})
export class EventModule {}
