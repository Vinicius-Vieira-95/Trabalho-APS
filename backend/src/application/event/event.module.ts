/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from '@/presentation/http/controllers/event.controller';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { DatabaseModule } from '@/infra/database/database.module';
import { TokenAdapter } from '@/infra/adapters/token.adapter';

@Module({
  imports: [DatabaseModule],
  controllers: [EventController],
  providers: [EventService, PrismaService, TokenAdapter],
})
export class EventModule {}
