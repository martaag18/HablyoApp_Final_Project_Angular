//Schema (Mongoose) -> cómo se almacenan datos en base de datos (MongoDB)
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class UsersWebinar extends Document {
  @Prop({ type: Date, required: true })
  webinarDate: Date;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  surname: string;

  @Prop({ required: true })
  age: number;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  motivation: string;

  @Prop()
  questions?: string;
}

export const UsersWebinarSchema = SchemaFactory.createForClass(UsersWebinar);
