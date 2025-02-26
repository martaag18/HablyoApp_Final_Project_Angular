import { Body, Controller, Post, Get } from '@nestjs/common';
import { UsersWebinarService } from './users-webinar.service';
import { CreateUsersWebinarDto } from './dto/create-users-webinar.dto';

@Controller('users-webinar')
export class UsersWebinarController {
  constructor(private readonly usersWebinarService: UsersWebinarService) {}

  @Post('signup')
  async signup(@Body() dto: CreateUsersWebinarDto) {
    const newSignup = await this.usersWebinarService.create(dto);
    return {
      message: 'Inscripción realizada con éxito',
      data: newSignup,
    };
  }

  @Get()
  async findAll() {
    const allSignups = await this.usersWebinarService.findAll();
    return {
      message: 'Inscripciones encontradas',
      data: allSignups,
    };
  }
}
