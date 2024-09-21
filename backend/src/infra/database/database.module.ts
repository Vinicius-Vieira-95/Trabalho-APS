/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { PrismaUserRepository } from '@/infra/database/prisma/repositories/user.repository';
import { UserRepository } from '@/domain/repositories/user.repository';
import { EventRepository } from '@/domain/repositories/event.repository';
import { PrismaEventRepository } from '@/infra/database/prisma/repositories/event.repository';
import { FrequencyListRepository } from '@/domain/repositories/frequency-list.repository';
import { PrismaFrequencyListRepository } from './prisma/repositories/frequency-list.repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
    {
      provide: EventRepository,
      useClass: PrismaEventRepository,
    },
    {
      provide: FrequencyListRepository,
      useClass: PrismaFrequencyListRepository,
    },
  ],
  exports: [
    UserRepository,
    EventRepository,
    FrequencyListRepository,
    PrismaService,
  ],
})
export class DatabaseModule {}
