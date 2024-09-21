/* eslint-disable prettier/prettier */
import { FrequencyList } from '@prisma/client';

export abstract class FrequencyListRepository {
  abstract getFrequencyListByEvent(eventId: string): Promise<FrequencyList>;
  abstract createFrequencyList(
    data: Omit<FrequencyList, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<FrequencyList>;
  abstract saveFrequencyList(
    id: string,
    data: Omit<FrequencyList, 'id'>,
  ): Promise<FrequencyList>;
}
