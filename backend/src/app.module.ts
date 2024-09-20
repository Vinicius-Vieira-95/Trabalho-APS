/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UserModule } from '@/application/user/user.module';
import { EventModule } from './application/event/event.module';

@Module({
  imports: [UserModule, EventModule],
})
export class AppModule {}
