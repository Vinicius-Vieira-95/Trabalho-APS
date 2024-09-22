import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsString,
  IsUUID,
} from 'class-validator';

export interface ICreateEventDto {
  name: string;
  description: string;
  userId: string;
  activityId: string;
  startDate: Date;
  status: string;
  endDate: Date;
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
  @IsUUID()
  activityId: string;

  @IsNotEmpty()
  @IsDate()
  endDate: Date;

  @IsNotEmpty()
  @IsDate()
  startDate: Date;

  @IsNotEmpty()
  @IsString()
  status: string;

  @IsNotEmpty()
  @IsBoolean()
  autoFrequency: boolean;
}
