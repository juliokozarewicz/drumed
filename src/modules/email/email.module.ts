import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { EmailService } from './email.service';


@Module({
    imports: [
      MailerModule.forRoot({
        transport: {
          host: process.env.HOST_EMAIL,
          port: process.env.PORT_EMAIL,
          secure: process.env.SECURE_EMAIL,
          auth: {
            user: process.env.FROM_EMAIL,
            pass: process.env.PASS_EMAIL,
          },
        },
      }),
    ],
    providers: [EmailService],
  })
export class EmailModule {}
