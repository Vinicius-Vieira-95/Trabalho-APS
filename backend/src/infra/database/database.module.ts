import { Module } from '@nestjs/common';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { PrismaUserRepository } from '@/infra/database/prisma/repositories/user.repository';
import { UserRepository } from '@/domain/repositories/user.repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
  ],
  exports: [UserRepository, PrismaService],
})
export class DatabaseModule {}
