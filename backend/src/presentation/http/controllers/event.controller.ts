/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { CreateEventDto } from '@/domain/dto/createEventDto';
import { EventService } from '@/application/event/event.service';
import { handleError, ok } from '@/presentation/http/helpers/http.helper';
import { Response } from 'express';
import {
  AttendanceSignatureDto,
  ValidateSignatureDto,
} from '@/domain/dtos/attendance-signature-dto';
import { UpdateEventDto } from '@/domain/dto/updateEventDto';
import { EventStatus } from '@prisma/client';

@Controller('events')
export class EventController {
  constructor(private readonly eventsService: EventService) {}

  @Get('open')
  async getOpenEvents(@Res() response: Response) {
    try {
      return response
        .status(200)
        .send(ok(await this.eventsService.getOpenEvents()));
    } catch (error) {
      return response.status(error.status).send(handleError(error));
    }
  }

  @Get('in-progress')
  async getInProgressEvents(@Res() response: Response) {
    try {
      return response
        .status(200)
        .send(ok(await this.eventsService.getInProgressEvents()));
    } catch (error) {
      return response.status(error.status).send(handleError(error));
    }
  }

  @Post('generate/token/attendance-signature/:eventId')
  async generateAttendanceToken(
    @Res() response: Response,
    @Param(':eventId') eventId: string,
    @Body() tokenProps: AttendanceSignatureDto,
  ) {
    try {
      return response.status(200).send(
        ok(
          await this.eventsService.generateAttendanceSignatureToken({
            timeToExpire: tokenProps.timeToExpire,
            eventId,
          }),
        ),
      );
    } catch (error) {
      return response.status(error.status).send(handleError(error));
    }
  }

  @Post('validate/attendance/:signatureToken')
  async validateAttendanceToken(
    @Res() response: Response,
    @Param(':signatureToken') signatureToken: string,
    @Body() validationProps: ValidateSignatureDto,
  ) {
    try {
      return response.status(200).send(
        ok(
          await this.eventsService.validateAttendanceSignatureToken({
            email: validationProps.email,
            signatureToken,
          }),
        ),
      );
    } catch (error) {
      return response.status(error.status).send(handleError(error));
    }
  }

  @Get('frequency/:eventId')
  async findFrequencyList(
    @Res() response: Response,
    @Param(':eventId') eventId: string,
  ) {
    try {
      return response
        .status(200)
        .send(ok(await this.eventsService.findFrequencyListFromEvent(eventId)));
    } catch (error) {
      return response.status(error.status).send(handleError(error));
    }
  }

  @Post(':eventId/register-user/:userId')
  async registerUserInEvent(
    @Param('eventId') eventId: string,
    @Param('userId') userId: string,
  ) {
    return await this.eventsService.registerUserInEvent({ eventId, userId });
  }

  @Patch(':id')
  async updateEvent(@Body() body: UpdateEventDto, @Param('id') id: string) {
    return await this.eventsService.updateEvent(id, body);
  }

  @Get(':id')
  async findEvent(@Param('id') id: string) {
    return await this.eventsService.findEventById(id);
  }

  @Get('/user/:userId')
  async getEventsByUserId(@Param('userId') userId: string) {
    return await this.eventsService.findEventsByUserId(userId);
  }

  @Delete(':id')
  async deleteEvent(@Param('id') id: string, @Res() response: Response) {
    await this.eventsService.deleteEvent(id);

    return response.status(204).send();
  }

  @Post()
  async create(@Body() body: CreateEventDto, @Res() response: Response) {
    try {
      const status = EventStatus.OPEN;
      const createdEvent = await this.eventsService.create({ ...body, status });

      return response.status(201).send(createdEvent);
    } catch (error) {
      return response.status(error.status).send(error);
    }
  }
}
