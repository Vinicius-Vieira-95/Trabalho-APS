import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EventRepository } from '@/domain/repositories/event.repository';
import { IUpdateEventDto } from '@/domain/dto/updateEventDto';
import { ICreateEventDto } from '@/domain/dto/createEventDto';
import { TokenAdapter } from '@/infra/adapters/token.adapter';
import { InvalidParamError, ServerError } from '@/presentation/errors';
import { UserRepository } from '@/domain/repositories/user.repository';
import { FrequencyRepository } from '@/domain/repositories/frequency.repository';
import { EventStatus } from '@prisma/client';

@Injectable()
export class EventService {
  constructor(
    private eventRepository: EventRepository,
    private userRepository: UserRepository,
    private tokenAdapter: TokenAdapter,
    private frequencyRepository: FrequencyRepository,
  ) {}

  async getOpenEvents() {
    const events = await this.eventRepository.getByOpenStatus();

    const newEvents = [];

    for (const event of events) {
      const frequencyList = await this.frequencyRepository.findByEventId(
        event.id,
      );

      newEvents.push({ ...event, usersList: frequencyList?.usersList || [] });
    }

    return newEvents;
  }

  async create(data: ICreateEventDto) {
    return await this.eventRepository.create(data);
  }

  async getInProgressEvents() {
    return await this.eventRepository.getByInProgressStatus();
  }

  async getFinishedEvents(status: EventStatus, userId: string) {
    if (status !== EventStatus.FINISHED) {
      throw new InvalidParamError('Status inválido');
    }

    const finishedEvents = [];
    const events = await this.eventRepository.getByStatus(status);
    if (!events) {
      throw new ServerError();
    }

    for (const event of events) {
      const frequencyList = await this.frequencyRepository.findByEventId(
        event.id,
      );

      const userInFrequencyList = frequencyList.usersList.find(
        (userList) => userList.userId === userId,
      );

      if (userInFrequencyList) {
        finishedEvents.push({
          ...event,
          usersList: frequencyList?.usersList || [],
        });
      }
    }

    return finishedEvents;
  }

  async generateAttendanceSignatureToken({
    eventId,
    timeToExpire,
  }: {
    eventId: string;
    timeToExpire: number;
  }) {
    const event = await this.eventRepository.findById(eventId);

    if (!event) {
      throw new InvalidParamError('Evento não encontrado');
    }

    const token = await this.tokenAdapter.generateToken(timeToExpire, {
      eventId,
    });

    return token;
  }

  async validateAttendanceSignatureToken({
    email,
    signatureToken,
  }: {
    email: string;
    signatureToken: string;
  }) {
    await this.tokenAdapter.verifyToken(signatureToken);

    const { eventId } = this.tokenAdapter.decodeToken(signatureToken);

    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new InvalidParamError('Usuário não encontrado');
    }

    await this.frequencyRepository.addUserPresenceByEventId({
      eventId,
      userId: user.id,
    });

    return { success: 'Presença registrada com sucesso' };
  }

  async findFrequencyListFromEvent(eventId: string) {
    const event = await this.eventRepository.findById(eventId);

    if (!event) {
      throw new InvalidParamError('Evento não encontrado');
    }

    if (!event.autoFrequency) {
      throw new InvalidParamError(
        'Este evento não permite gerenciamento de frequência',
      );
    }

    return await this.frequencyRepository.findByEventId(eventId);
  }

  async updateFrequencyList({
    frequencyListId,
    usersList,
  }: {
    frequencyListId: string;
    usersList: { userId: string; attended: boolean }[];
  }) {
    return await this.frequencyRepository.updateUsersListById({
      id: frequencyListId,
      usersList,
    });
  }

  async finishEvent(eventId: string) {
    return await this.eventRepository.updateStatusById({
      status: 'FINISHED',
      id: eventId,
    });
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

    let frequencyList = await this.frequencyRepository.findByEventId(eventId);

    if (!frequencyList) {
      const event = await this.eventRepository.findById(eventId);

      if (!event) {
        throw new NotFoundException('Evento não encontrado');
      }

      frequencyList = await this.frequencyRepository.createFrequencyList({
        eventId,
        teacherId: event.userId,
        usersList: [],
      });
    }

    let usersList = [...frequencyList.usersList];

    if (usersList.find((value) => value.userId === userId)) {
      usersList = usersList.filter((value) => value.userId !== userId);
    } else {
      usersList = [...usersList, { attended: false, userId }];
    }
    const newFrequencyList = { ...frequencyList, usersList: [...usersList] };

    const id = newFrequencyList.id;

    delete newFrequencyList.id;

    return await this.frequencyRepository.saveFrequencyList(
      id,
      newFrequencyList,
    );
  }

  async updateEvent(id: string, data: IUpdateEventDto) {
    return await this.eventRepository.updateEvent(id, data);
  }

  async deleteEvent(id: string) {
    return await this.eventRepository.deleteEvent(id);
  }
}
