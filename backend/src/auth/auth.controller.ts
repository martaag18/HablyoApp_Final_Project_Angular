import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDot } from './dto/login.dot/login.dot';

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
      secure: false,
      sameSite: 'none',
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(HttpStatus.OK).json({ message: 'Login exitoso' });
  }

  @Post('logout')
  logout(@Res() res: Response) {
    res.clearCookie('jwt');
    return res.status(HttpStatus.OK).json({ message: 'Logout exitoso' });
  }

  // @Get('check') //verificar si cookie jwt sigue siendo válida
  // check(@Req() req: Request, @Res() res: Response) {
  //   try {
  //     const token: string | undefined = req.cookies?.jwt; //token será string si existe o undefined si no existe.

  //     if (!token) {
  //       throw new UnauthorizedException('No hay cookie de sesión');
  //     }
  //     const payload: JwtPayload = this.jwtService.verify<JwtPayload>(token); //verificar el token JWT con la clave secreta -> valida firma e integridad del token, si token es válid -> devuelve payload (contenido guardado en el token cuando se firmó)

  //     return res.status(HttpStatus.OK).json({
  //       loggedIn: true,
  //       userId: payload.sub,
  //       email: payload.email,
  //     });
  //   } catch (err) {
  //     console.error(err);
  //     throw new UnauthorizedException('Token inválido o expirado');
  //   }
  // }
}
