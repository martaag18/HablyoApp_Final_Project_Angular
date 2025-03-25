// mail.module.ts
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';

@Module({
  providers: [MailService],
  exports: [MailService], // Exportamos MailService para usarlo en otros módulos
})
export class MailModule {}
