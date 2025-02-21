import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class WhitelistEmail extends Document {
  @Prop({ required: true, unique: true })
  email: string;
}

export const WhitelistEmailSchema =
  SchemaFactory.createForClass(WhitelistEmail);
