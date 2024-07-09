// email.service.ts

import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async enviarEmail(destinatario: string, assunto: string, corpo: string) {
    try {
      await this.mailerService.sendMail({
        to: destinatario,
        subject: assunto,
        text: corpo,
      });
      console.log('E-mail enviado com sucesso!');
    } catch (error) {
      console.error('Erro ao enviar e-mail:', error);
      throw error;
    }
  }
}
