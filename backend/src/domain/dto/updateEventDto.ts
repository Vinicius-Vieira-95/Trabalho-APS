import { IsBoolean, IsDate, IsNotEmpty, IsString } from 'class-validator';

export interface IUpdateEventDto {
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  status: string;
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
  @IsString()
  status: string;

  @IsNotEmpty()
  @IsBoolean()
  autoFrequency: boolean;
}
