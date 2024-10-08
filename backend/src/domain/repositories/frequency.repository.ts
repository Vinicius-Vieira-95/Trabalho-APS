import { FrequencyList } from '@prisma/client';

export abstract class FrequencyRepository {
  abstract addUserPresenceByEventId({
    eventId,
    userId,
  }: {
    eventId: string;
    userId: string;
  }): Promise<boolean>;
  abstract findByEventId(eventId: string): Promise<FrequencyList | undefined>;
  abstract findById(id: string): Promise<FrequencyList | undefined>;
  abstract updateUsersListById({
    id,
    usersList,
  }: {
    id: string;
    usersList: { userId: string; attended: boolean }[];
  }): Promise<FrequencyList>;
  abstract createFrequencyList(
    data: Omit<FrequencyList, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<FrequencyList>;
  abstract saveFrequencyList(
    id: string,
    data: Omit<FrequencyList, 'id'>,
  ): Promise<FrequencyList>;
}
