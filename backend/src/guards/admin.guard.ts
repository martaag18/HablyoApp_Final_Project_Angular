import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    // Indica que getRequest() retorna un objeto tipo Request de express
    const request = context.switchToHttp().getRequest<Request>();

    // Forzar que el header sea string (o undefined si no existe)
    const headerToken: string | undefined = request.headers['x-admin-token'] as
      | string
      | undefined;

    const adminToken = this.configService.get<string>('ADMIN_TOKEN');

    if (!adminToken || !headerToken || adminToken !== headerToken) {
      throw new UnauthorizedException('Invalid admin token');
    }

    return true;
  }
}
