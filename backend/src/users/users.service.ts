import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { WhitelistService } from 'src/whitelist/whitelist.service'; // Para comprobar la lista blanca
import { User } from './schemas/user.schema'; // Tu esquema de usuario
import { RegisterDto } from './dto/register.dto'; // DTO con email, password, etc.

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly whitelistService: WhitelistService,
  ) {}

  /**
   * Registra un nuevo usuario.
   * 1. Verifica si el email está en la whitelist
   * 2. Comprueba si ya existe un user con ese email
   * 3. Hashea la contraseña
   * 4. Crea y retorna el user
   */
  async register(dto: RegisterDto): Promise<User> {
    // 1. Revisar whitelist
    const allowed = await this.whitelistService.isWhitelisted(dto.email);
    if (!allowed) {
      throw new BadRequestException(
        'Este email no está autorizado para registrarse',
      );
    }

    // 2. Normalizar email y verificar si ya existe
    const normalizedEmail = dto.email.trim().toLowerCase();
    const existingUser = await this.userModel.findOne({
      email: normalizedEmail,
    });
    if (existingUser) {
      throw new BadRequestException('Este email ya está registrado');
    }

    // 3. Hashear la contraseña
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(dto.password, saltRounds);

    // 4. Crear y guardar el usuario
    const newUser = new this.userModel({
      email: normalizedEmail,
      password: hashedPassword,
      name: dto.name,
      surname: dto.surname,
      age: dto.age,
    });

    return newUser.save();
  }

  /**
   * Busca un usuario por email (normalizado).
   */
  async findByEmail(email: string): Promise<User | null> {
    const normalizedEmail = email.trim().toLowerCase();
    return this.userModel.findOne({ email: normalizedEmail });
  }

  /**
   * Valida las credenciales (email, password).
   * Devuelve el usuario si coincide la contraseña, o null si falla.
   */
  async validateUser(email: string, pass: string): Promise<User | null> {
    const user = await this.findByEmail(email);
    if (!user) return null;

    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) return null;

    return user;
  }

  /**
   * Lista todos los usuarios (ejemplo).
   */
  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findById(userId: string): Promise<User | null> {
    return this.userModel.findById(userId).exec();
  }

  /**
   * Elimina un usuario por su ID (ejemplo).
   */
  async removeUser(userId: string): Promise<{ deleted: boolean }> {
    const result = await this.userModel.deleteOne({ _id: userId });
    return { deleted: result.deletedCount > 0 };
  }
}
