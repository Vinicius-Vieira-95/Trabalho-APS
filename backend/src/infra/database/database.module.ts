/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { PrismaUserRepository } from '@/infra/database/prisma/repositories/user.repository';
import { UserRepository } from '@/domain/repositories/user.repository';
import { EventRepository } from '@/domain/repositories/event.repository';
import { PrismaEventRepository } from '@/infra/database/prisma/repositories/event.repository';
import { PrismaFrequencyRepository } from '@/infra/database/prisma/repositories/frequency.repository';
import { FrequencyRepository } from '@/domain/repositories/frequency.repository';

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
      provide: FrequencyRepository,
      useClass: PrismaFrequencyRepository,
    },
  ],
  exports: [
    UserRepository,
    FrequencyRepository,
    EventRepository,
    PrismaService,
  ],
})
export class DatabaseModule {}
