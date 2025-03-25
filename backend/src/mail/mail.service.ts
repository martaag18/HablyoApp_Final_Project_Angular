import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { Transporter, SentMessageInfo } from 'nodemailer';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);

  // Transporter sin genérico específico para evitar choques entre smtp-pool / smtp-transport
  private transporter: Transporter;

  constructor() {
    // Asegúrate de haber instalado:
    // npm install nodemailer
    // npm install -D @types/nodemailer
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAIL_USER, // tu email
        pass: process.env.MAIL_PASS, // la contraseña de aplicación
      },
    });
  }

  /**
   * Envía un correo de recuperación de contraseña con un enlace de reseteo.
   */
  async sendForgotPasswordEmail(
    email: string,
    resetLink: string,
  ): Promise<SentMessageInfo> {
    try {
      // Aquí forzamos la respuesta a SentMessageInfo para que TS no lo marque como any
      const info = (await this.transporter.sendMail({
        from: '"Tu App" <no-reply@tuapp.com>',
        to: email,
        subject: 'Recuperar contraseña',
        text: `Haz clic en el siguiente enlace para recuperar tu contraseña: ${resetLink}`,
        // html: `<p>Haz clic en <a href="${resetLink}">este enlace</a> para recuperar tu contraseña.</p>`
      })) as SentMessageInfo;

      // Ahora TS sabe que info es SentMessageInfo, así que .messageId no es “unsafe”
      this.logger.log(`Correo de recuperación enviado: ${info.messageId}`);
      return info;
    } catch (error) {
      this.logger.error('Error al enviar correo de recuperación', error);
      throw error;
    }
  }
}
