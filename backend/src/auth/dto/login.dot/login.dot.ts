import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDot {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
