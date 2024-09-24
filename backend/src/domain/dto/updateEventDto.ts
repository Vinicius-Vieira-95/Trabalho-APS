import { EventStatus } from '@prisma/client';
import { IsBoolean, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export interface IUpdateEventDto {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  status: EventStatus;
  autoFrequency: boolean;
}

export class UpdateEventDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  startDate: string;

  @IsNotEmpty()
  @IsString()
  endDate: string;

  @IsNotEmpty()
  @IsEnum(EventStatus)
  status: EventStatus;

  @IsNotEmpty()
  @IsBoolean()
  autoFrequency: boolean;
}
