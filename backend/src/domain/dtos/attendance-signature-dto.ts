import { IsEmail, IsNumber } from 'class-validator';

export class AttendanceSignatureDto {
  @IsNumber()
  timeToExpire: number;
}

export class ValidateSignatureDto {
  @IsEmail()
  email: string;
}
