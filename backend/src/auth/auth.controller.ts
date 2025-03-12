import {
  Controller,
  Post,
  Body,
  Res,
  Get,
  Req,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDot } from './dto/login.dot/login.dot';
import { Response, Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('login')
  async login(@Body() loginDto: LoginDot, @Res() res: Response) {
    const { email, password } = loginDto;
    const { token } = await this.authService.loginUser(email, password);

    res.cookie('jwt', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 24 * 60 * 60 * 1000, // 1 día
    });

    console.log('Cookie de sesión JWT establecida correctamente');
    return res.status(HttpStatus.OK).json({ message: 'Login exitoso' });
  }

  @Post('logout')
  logout(@Res() res: Response) {
    res.clearCookie('jwt', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      expires: new Date(0), // Expira inmediatamente
      path: '/',
    });
    console.log('Cookie de sesión eliminada en logout');
    return res.status(HttpStatus.OK).json({ message: 'Logout exitoso' });
  }

  @Get('check')
  check(@Req() req: Request, @Res() res: Response) {
    console.log('Cookies en /auth/check:', req.cookies);
    try {
      const token: string | undefined = req.cookies?.jwt;
      console.log('Token recibido en /auth/check:', token);

      if (!token) {
        console.warn('No se recibió ninguna cookie JWT');
        throw new UnauthorizedException('No hay cookie de sesión');
      }

      const payload = this.jwtService.verify(token); // Verifica el token

      console.log('Token válido, usuario autenticado:', payload);
      return res.status(HttpStatus.OK).json({
        loggedIn: true,
        userId: payload.sub,
        email: payload.email,
      });
    } catch (err) {
      console.error('Error al verificar token:', err.message);
      return res.status(HttpStatus.UNAUTHORIZED).json({
        message: 'Token inválido o expirado',
      });
    }
  }
}

//payload - inf que ponemos en el token
//token - cadena de caracteres que contiene información del usuario como el ID,email...
//En autenticación, la cookie se utiliza para almacenar el token
