import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService, // JwtService -> firmar token
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
}
