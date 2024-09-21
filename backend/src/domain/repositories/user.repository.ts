import User from '@/domain/entities/user.entity';

export abstract class UserRepository {
  abstract findById(userId: string): Promise<User>;
  abstract findByEmail(email: string): Promise<User>;
}
