import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/infra/database/database.module';
import { UserService } from './user.service';
import { UserController } from '@/presentation/http/controllers/user.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
