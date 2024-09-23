import { Injectable } from '@nestjs/common';
import { EventRepository } from '@/domain/repositories/event.repository';
import { IUpdateEventDto } from '@/domain/dto/updateEventDto';
import { ICreateEventDto } from '@/domain/dto/createEventDto';
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

  async create(data: ICreateEventDto) {
    return await this.eventRepository.create(data);
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

  async updateEvent(id: string, data: IUpdateEventDto) {
    return await this.eventRepository.updateEvent(id, data);
  }

  async deleteEvent(id: string) {
    return await this.eventRepository.deleteEvent(id);
  }
}
