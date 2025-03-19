import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { JwtPayload } from 'src/auth/types/jwt-payload.interface';

@Injectable()
export class JwtCookieGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    // Simplemente usamos Request,
    // asumiendo que en tu archivo de declaración ya añadiste `user?: JwtPayload`.
    const request = context.switchToHttp().getRequest<Request>();

    const token: string | undefined = request.cookies?.jwt;
    if (!token) {
      throw new UnauthorizedException('No se encontró la cookie JWT');
    }

    try {
      // Tipamos la verificación con JwtPayload
      const payload = this.jwtService.verify<JwtPayload>(token);
      // Asignamos el payload al request.user (gracias a la augmentación global)
      request.user = payload;
      return true;
    } catch (err) {
      console.error('Error al verificar token:', err);
      throw new UnauthorizedException('Token inválido o expirado');
    }
  }
}
