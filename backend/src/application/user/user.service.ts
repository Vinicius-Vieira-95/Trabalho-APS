import { Injectable } from '@nestjs/common';
import { UserRepository } from '@/domain/repositories/user.repository';
import User from '@/domain/entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findUserById(userId: string): Promise<User> {
    const user = await this.userRepository.findById(userId);
    return user;
  }
}
