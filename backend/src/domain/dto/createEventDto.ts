import { EventStatus } from '@prisma/client';
import { IsBoolean, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export interface ICreateEventDto {
  name: string;
  description: string;
  userId: string;
  activityId: string;
  startDate: string;
  date: string;
  status: EventStatus;
  endDate: string;
  autoFrequency: boolean;
}

export class CreateEventDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @IsNotEmpty()
  @IsString()
  activityId: string;

  @IsNotEmpty()
  @IsString()
  date: string;

  @IsNotEmpty()
  @IsString()
  endDate: string;

  @IsNotEmpty()
  @IsString()
  startDate: string;

  @IsNotEmpty()
  @IsBoolean()
  autoFrequency: boolean;
}
