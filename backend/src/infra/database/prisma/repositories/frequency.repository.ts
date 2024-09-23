import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { FrequencyRepository } from '@/domain/repositories/frequency.repository';
import { FrequencyList } from '@prisma/client';

@Injectable()
export class PrismaFrequencyRepository implements FrequencyRepository {
  constructor(private prisma: PrismaService) {}
  async updateUsersListById({
    id,
    usersList,
  }: {
    id: string;
    usersList: { userId: string; attended: boolean }[];
  }): Promise<FrequencyList> {
    return await this.prisma.frequencyList.update({
      where: {
        id,
      },
      data: {
        usersList,
      },
    });
  }

  async findById(id: string): Promise<FrequencyList | undefined> {
    return await this.prisma.frequencyList.findUnique({
      where: {
        id,
      },
    });
  }

  async findByEventId(eventId: string): Promise<FrequencyList | undefined> {
    return await this.prisma.frequencyList.findFirst({
      where: {
        eventId,
      },
    });
  }

  async addUserPresenceByEventId({
    eventId,
    userId,
  }: {
    eventId: string;
    userId: string;
  }): Promise<boolean> {
    await this.prisma.frequencyList.updateMany({
      where: {
        eventId,
        usersList: {
          some: {
            userId,
          },
        },
      },
      data: {
        usersList: {
          updateMany: {
            where: {
              userId,
            },
            data: {
              attended: true,
            },
          },
        },
      },
    });

    return true;
  }

  async createFrequencyList(
    data: Omit<FrequencyList, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<FrequencyList> {
    const frequencyList = await this.prisma.frequencyList.create({ data });

    return frequencyList;
  }

  async saveFrequencyList(
    id: string,
    data: Omit<FrequencyList, 'id'>,
  ): Promise<FrequencyList> {
    return await this.prisma.frequencyList.update({
      where: { id },
      data,
    });
  }
}
