/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';
import { EventosService } from './open-events.service';

@Controller('eventos')
export class EventosController {
  constructor(private readonly eventosService: EventosService) {}

  // Endpoint para listar eventos em aberto
  @Get('em-aberto')
  async findEventosEmAberto() {
    return this.eventosService.findEventosEmAberto();
  }
}

