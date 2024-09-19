import { Module } from '@nestjs/common';
import { UserModule } from '@/application/user/user.module';
import { OpenEventsModule } from './application/open-events/open-events.module';

@Module({
  imports: [UserModule, OpenEventsModule],
})
export class AppModule {}
