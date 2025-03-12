import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WhitelistService } from './whitelist.service';
import { WhitelistController } from './whitelist.controller';
import {
  WhitelistEmail,
  WhitelistEmailSchema,
} from './schemas/whitelist-email.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: WhitelistEmail.name, schema: WhitelistEmailSchema },
    ]),
  ],
  controllers: [WhitelistController],
  providers: [WhitelistService],
  exports: [WhitelistService],
})
export class WhitelistModule {}
