import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterDto } from './dto/register.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post()
  async registerUser(@Body() dto: RegisterDto) {
    console.log('Entrando a POST /users con dto:', dto);
    const user = await this.usersService.register(dto);
    return { message: 'Usuario creado con éxito', user };
  }

  @Get()
  async findAll() {
    const users = await this.usersService.findAll();
    return users;
  }
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findById(id);
    if (!user) {
      throw new BadRequestException('Usuario no encontrado');
    }
    return user;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.usersService.removeUser(id);
  }
}
