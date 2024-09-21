/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { FrequencyListRepository } from '@/domain/repositories/frequency-list.repository';
import { FrequencyList } from '@prisma/client';

@Injectable()
export class PrismaFrequencyListRepository implements FrequencyListRepository {
  constructor(private prisma: PrismaService) {}

  async createFrequencyList(
    data: Omit<FrequencyList, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<FrequencyList> {
    const frequencyList = await this.prisma.frequencyList.create({ data });

    return frequencyList;
  }

  async getFrequencyListByEvent(eventId: string): Promise<FrequencyList> {
    try {
      const frequencyList = await this.prisma.frequencyList.findFirst({
        where: { eventId },
      });

      return frequencyList;
    } catch (error) {
      throw new NotFoundException('Frequency List not found');
    }
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
