import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { JwtPayload } from './types/jwt-payload.interface';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService, // JwtService -> sign token
    private readonly mailService: MailService,
  ) {}

  async loginUser(email: string, password: string): Promise<{ token: string }> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Email o contraseña inválidos');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Email o contraseña inválidos');
    } else {
      console.log('Login exitoso para el usuario:', email);
    }

    const payload = { sub: user._id, email: user.email };
    const token = this.jwtService.sign(payload);

    return { token };
  }

  async handleForgotPassword(email: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      return;
    }

    const token = this.jwtService.sign({ sub: user._id }, { expiresIn: '15m' });

    // Construir el enlace de recuperación
    const resetLink = `http://localhost:4200/reset-password?token=${token}`;

    // Enviar correo real
    await this.mailService.sendForgotPasswordEmail(email, resetLink);

    // (Opcional) Guardar el token en DB si quieres invalidarlo tras un uso
  }

  // 2) reset-password: verificar token y actualizar contraseña
  async handleResetPassword(token: string, newPassword: string) {
    let payload: JwtPayload;
    try {
      // Tipamos la verificación para que TypeScript sepa que payload.sub es string
      payload = this.jwtService.verify<JwtPayload>(token);
    } catch (err) {
      console.error(err);
      throw new UnauthorizedException('Token inválido o expirado');
    }

    const userId: string = payload.sub; // Aseguramos que es string

    // Buscar el usuario
    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    // Hashear la nueva contraseña
    const hashed = await bcrypt.hash(newPassword, 10);

    // Actualizar la contraseña en DB
    const updatedUser = await this.usersService.updateUserPassword(
      userId,
      hashed,
    );
    if (!updatedUser) {
      throw new UnauthorizedException('No se pudo actualizar la contraseña');
    }

    // (Opcional) Invalidar el token si lo guardaste en DB
    // await this.tokenService.markTokenUsed(token);
  }
}

/*
Comentarios:
- JwtService: servicio para generar "firmar" y verificar tokens JWT
- JWT(JSON Web Token): token(cadena de texto) que codifica información (payload) de forma segura y se firma digitalmente.
- Token: cadena que representa la identidad y permisos de un usuario. 
- Cookie: pequeño fragmento de datos que el servidor puede enviar al cliente y que se almacena en el navegador. -> se puede utilizar para guardar el token de forma segura
- bcrypt: librería para hashear (cifrar) contraseñas de forma segura
*/
