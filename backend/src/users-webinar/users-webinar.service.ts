import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UsersWebinar } from './schemas/users-webinar.schema';
import { Model } from 'mongoose';
import { CreateUsersWebinarDto } from './dto/create-users-webinar.dto';

@Injectable()
export class UsersWebinarService {
  constructor(
    @InjectModel(UsersWebinar.name)
    private usersWebinarModel: Model<UsersWebinar>, //Inyectamos el modelo de Moongose asociado al schema UsersWebinar
  ) {}

  async create(dto: CreateUsersWebinarDto): Promise<UsersWebinar> {
    const exists = await this.usersWebinarModel
      .findOne({ email: dto.email })
      .exec();

    if (exists) {
      throw new BadRequestException('Este email ya se ha suscrito al webinar');
    }
    const newUserWebinar = new this.usersWebinarModel(dto);
    return newUserWebinar.save();
  }

  async findAll(): Promise<UsersWebinar[]> {
    return this.usersWebinarModel.find().exec(); //find busca todos los doc en la coleccion y exec() convierte la consulta en una promesa
  }
}
