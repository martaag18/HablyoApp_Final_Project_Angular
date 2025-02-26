//dto -> Data Transfer Object -> define la forma y validaciones de los datos que endpoint recibe
import {
  IsNotEmpty,
  IsEmail,
  IsNumber,
  IsOptional,
  IsDate,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateUsersWebinarDto {
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  webinarDate: Date;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  surname: string;

  @IsNumber()
  age: number;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  motivation: string;

  @IsOptional()
  questions?: string;
}
