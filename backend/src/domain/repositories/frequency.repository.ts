import { FrequencyList } from '@prisma/client';

export abstract class FrequencyRepository {
  abstract addUserPresenceByEventId({
    eventId,
    userId,
  }: {
    eventId: string;
    userId: string;
  }): Promise<boolean>;
  abstract findByEventId(eventId: string): Promise<FrequencyList>;
  abstract findById(id: string): Promise<FrequencyList>;
  abstract updateUsersListById({
    id,
    usersList,
  }: {
    id: string;
    usersList: { userId: string; attended: boolean }[];
  }): Promise<FrequencyList>;
}
