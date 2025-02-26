// users-webinar.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersWebinarService } from './users-webinar.service';
import { UsersWebinarController } from './users-webinar.controller';
import {
  UsersWebinar,
  UsersWebinarSchema,
} from './schemas/users-webinar.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UsersWebinar.name, schema: UsersWebinarSchema },
    ]),
  ],
  controllers: [UsersWebinarController],
  providers: [UsersWebinarService],
  exports: [UsersWebinarService],
})
export class UsersWebinarModule {}
