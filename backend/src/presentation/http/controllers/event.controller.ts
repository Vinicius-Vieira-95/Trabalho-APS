import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { EventService } from '@/application/event/event.service';
import { handleError, ok } from '@/presentation/http/helpers/http.helper';
import { Response } from 'express';
import {
  AttendanceSignatureDto,
  ValidateSignatureDto,
} from '@/domain/dtos/attendance-signature-dto';

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
}
