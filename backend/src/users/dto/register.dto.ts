import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  Matches,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @IsEmail({}, { message: 'El email no es válido' })
  email: string;

  @IsNotEmpty({ message: 'La contraseña no puede estar vacía' })
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  @MaxLength(50, { message: 'La contraseña no puede exceder 50 caracteres' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z]).+$/, {
    message:
      'La contraseña debe contener al menos una mayúscula y una minúscula',
  })
  password: string;

  // Por si quieres mensajes en "name" también
  @MaxLength(100, { message: 'El nombre no puede exceder 100 caracteres' })
  name: string;

  @MaxLength(100, { message: 'El apellido no puede exceder 100 caracteres' })
  surname?: string;

  @IsInt({ message: 'La edad debe ser un número entero' })
  @Min(1, { message: 'La edad mínima es 1' })
  age: number;
}
