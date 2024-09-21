/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EventRepository } from '@/domain/repositories/event.repository';
import { FrequencyListRepository } from '@/domain/repositories/frequency-list.repository';
import { UserRepository } from '@/domain/repositories/user.repository';

@Injectable()
export class EventService {
  constructor(
    private eventRepository: EventRepository,
    private frequencyListRepository: FrequencyListRepository,
    private userRepository: UserRepository,
  ) {}

  async findOpenEvents() {
    return await this.eventRepository.getByOpenStatus();
  }

  async registerUserInEvent({
    eventId,
    userId,
  }: {
    eventId: string;
    userId: string;
  }) {
    const user = await this.userRepository.findById(userId);

    if (user.type !== 'STUDENT') {
      throw new HttpException(
        'Only students can be registered in an event',
        HttpStatus.EXPECTATION_FAILED,
      );
    }

    let frequencyList =
      await this.frequencyListRepository.getFrequencyListByEvent(eventId);

    if (!frequencyList) {
      const event = await this.eventRepository.getEventById(eventId);
      frequencyList = await this.frequencyListRepository.createFrequencyList({
        eventId,
        teacherId: event.userId,
        usersList: [],
      });
    }

    let usersList = [...frequencyList.usersList];

    if (usersList.find((value) => value.userId === userId && value.attended)) {
      usersList = usersList.map((value) =>
        value.userId === userId ? { ...value, attended: false } : { ...value },
      );
    } else if (
      usersList.find((value) => value.userId === userId && !value.attended)
    ) {
      usersList = usersList.map((value) =>
        value.userId === userId ? { ...value, attended: true } : { ...value },
      );
    } else {
      usersList = [...usersList, { attended: true, userId }];
    }
    const newFrequencyList = { ...frequencyList, usersList: [...usersList] };

    const id = newFrequencyList.id;

    delete newFrequencyList.id;

    return await this.frequencyListRepository.saveFrequencyList(
      id,
      newFrequencyList,
    );
  }
}
