// email.service.ts

import { BadRequestException, Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {

    const emailPort = process.env.EMAIL_PORT ? parseInt(process.env.EMAIL_PORT, 10) : 0;

    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: emailPort,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  async sendTextEmail(to: string, subject: string, text: string): Promise<void> {

    try {
      await this.transporter.sendMail({
        to,
        subject,
        text,
      });
  } catch (error) {
    throw new BadRequestException({
      statusCode: 400,
      message: `email sending service`,
      _links: {
          self: { href: "/accounts/signup" },
          next: { href: "/accounts/signup" },
          prev: { href: "/accounts/signup" }
      }
    });
  }}
}
