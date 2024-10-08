import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { UserRepository } from '@/domain/repositories/user.repository';
import { User } from '@prisma/client';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}
  async findByEmail(email: string): Promise<User> {
    return await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async findById(userId: string): Promise<User> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      return user;
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }

  async createStudentUser(): Promise<User> {
    return await this.prisma.user.create({
      data: {
        email: 'student@student.com',
        name: 'Student',
        password: '1234',
        registration: '123456',
        type: 'STUDENT',
      },
    });
  }

  async createTeacherUser(): Promise<User> {
    return await this.prisma.user.create({
      data: {
        email: 'student@student.com',
        name: 'Student',
        password: '1234',
        registration: '12345',
        type: 'TEACHER',
      },
    });
  }
}
