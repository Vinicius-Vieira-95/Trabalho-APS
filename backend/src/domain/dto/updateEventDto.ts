import { EventStatus } from '@prisma/client';
import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export interface IUpdateEventDto {
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
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
  @IsDate()
  startDate: Date;

  @IsNotEmpty()
  @IsDate()
  endDate: Date;

  @IsNotEmpty()
  @IsEnum(EventStatus)
  status: EventStatus;

  @IsNotEmpty()
  @IsBoolean()
  autoFrequency: boolean;
}
