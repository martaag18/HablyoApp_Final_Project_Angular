import {
  Controller,
  Post,
  Body,
  Res,
  Get,
  Req,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDot } from './dto/login.dot/login.dot';
import { Response, Request } from 'express';
import { JwtCookieGuard } from 'src/guards/jwt-cookie.guard';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { UnauthorizedException } from '@nestjs/common';

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
      maxAge: 24 * 60 * 60 * 1000, // 1 day
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
      expires: new Date(0),
      path: '/',
    });
    console.log('Cookie de sesión eliminada en logout');
    return res.status(HttpStatus.OK).json({ message: 'Logout exitoso' });
  }

  @Get('check')
  @UseGuards(JwtCookieGuard)
  check(@Req() req: Request, @Res() res: Response) {
    // Para propósitos de ejemplo, mostramos la cookie
    console.log('Cookies en /auth/check:', req.cookies);

    // Llegados aquí, el guard ya validó el token y asignó el payload a req.user
    return res.status(HttpStatus.OK).json({
      loggedIn: true,
      userId: req.user?.sub,
      email: req.user?.email,
    });
  }

  @Post('forgot-password')
  async forgotPassword(
    @Body() forgotPasswordDto: ForgotPasswordDto,
    @Res() res: Response,
  ) {
    const { email } = forgotPasswordDto;
    await this.authService.handleForgotPassword(email);

    return res.status(HttpStatus.OK).json({
      message:
        'Si existe un usuario con ese email, se ha enviado un enlace de recuperación.',
    });
  }

  @Post('reset-password')
  async resetPassword(
    @Body() resetPasswordDto: ResetPasswordDto,
    @Res() res: Response,
  ) {
    const { token, newPassword } = resetPasswordDto;
    try {
      await this.authService.handleResetPassword(token, newPassword);
      return res.status(HttpStatus.OK).json({
        message: 'Contraseña actualizada con éxito',
      });
    } catch (err) {
      console.error(err);
      throw new UnauthorizedException('Token inválido o expirado');
    }
  }
}
