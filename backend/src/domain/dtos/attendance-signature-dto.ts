import { IsEmail, IsNumber, IsUrl } from 'class-validator';

export class AttendanceSignatureDto {
  @IsNumber()
  timeToExpire: number;
}

export class ValidateSignatureDto {
  @IsEmail()
  email: string;

  @IsUrl()
  redirectUrl: string;
}
