import {
  Controller,
  Post,
  Delete,
  Get,
  Body,
  Query,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { WhitelistService } from './whitelist.service';
import { AdminGuard } from 'src/guards/admin.guard';

@UseGuards(AdminGuard) // Aplica el guard a TODOS los endpoints de este controlador
@Controller('whitelist')
export class WhitelistController {
  constructor(private readonly whitelistService: WhitelistService) {}

  // Añadir un email a la whitelist
  @Post()
  async add(@Body('email') email: string) {
    if (!email) {
      throw new BadRequestException('Email es requerido');
    }
    return this.whitelistService.addEmail(email);
  }

  // Eliminar un email de la whitelist
  @Delete()
  async remove(@Body('email') email: string) {
    if (!email) {
      throw new BadRequestException('Email es requerido');
    }
    return this.whitelistService.removeEmail(email);
  }

  // Comprobar si un email está en la whitelist
  @Get()
  async check(@Query('email') email: string) {
    if (!email) {
      throw new BadRequestException('Email es requerido en query param');
    }
    const isAllowed = await this.whitelistService.isWhitelisted(email);
    return { email, whitelisted: isAllowed };
  }
}
