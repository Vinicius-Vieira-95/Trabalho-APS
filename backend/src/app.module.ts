/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UserModule } from '@/application/user/user.module';
import { OpenEventsModule } from './application/event/event.module';

@Module({
  imports: [UserModule, OpenEventsModule],
})
export class AppModule {}
