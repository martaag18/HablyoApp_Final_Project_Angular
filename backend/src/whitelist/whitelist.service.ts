import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WhitelistEmail } from './schemas/whitelist-email.schema';

@Injectable()
export class WhitelistService {
  constructor(
    @InjectModel(WhitelistEmail.name)
    private readonly whitelistModel: Model<WhitelistEmail>,
  ) {}

  // Añadir email a la whitelist
  async addEmail(email: string): Promise<WhitelistEmail> {
    const normalized = email.trim().toLowerCase();
    const exists = await this.whitelistModel.findOne({ email: normalized });
    if (exists) {
      throw new BadRequestException('Email ya está en la whitelist');
    }

    const newEntry = new this.whitelistModel({ email: normalized });
    return newEntry.save();
  }

  // Eliminar email de la whitelist
  async removeEmail(email: string): Promise<{ deleted: boolean }> {
    const normalized = email.trim().toLowerCase();
    const result = await this.whitelistModel.deleteOne({ email: normalized });
    return { deleted: result.deletedCount > 0 };
  }

  // Verificar si un email está en la whitelist
  async isWhitelisted(email: string): Promise<boolean> {
    const normalized = email.trim().toLowerCase();
    const entry = await this.whitelistModel.findOne({ email: normalized });
    return !!entry; // true si existe, false si no
  }
}
