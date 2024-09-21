import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EventRepository } from '@/domain/repositories/event.repository';
import { TokenAdapter } from '@/infra/adapters/token.adapter';
import { InvalidParamError } from '@/presentation/errors';
import { UserRepository } from '@/domain/repositories/user.repository';
import { FrequencyRepository } from '@/domain/repositories/frequency.repository';

@Injectable()
export class EventService {
  constructor(
    private eventRepository: EventRepository,
    private userRepository: UserRepository,
    private tokenAdapter: TokenAdapter,
    private frequencyRepository: FrequencyRepository,
  ) {}

  async getOpenEvents() {
    return await this.eventRepository.getByOpenStatus();
  }

  async getInProgressEvents() {
    return await this.eventRepository.getByInProgressStatus();
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
}
