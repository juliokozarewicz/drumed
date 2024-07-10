import nodemailer from 'nodemailer'

interface ISendMail {
    to: string
    subject: string
    message: string
}
export class MailService {

  // logic for sending emails will go here
  async send({ to, subject, message, }: ISendMail) {
      var transporter = nodemailer.createTransport({
         host: process.env.EMAIL_HOST,
         port: process.env.EMAIL_PORT,
         auth: {
            user: process.env.EMAIL_FROM,
            pass: process.env.EMAIL_PASS,
         }
      });

      var mailOptions = {
        from: process.env.EMAIL_HOST,
        to,
        subject,
        html: message,
      };

      try {
          await transporter.sendMail(mailOptions)
          return true
      } catch(error) {

          console.error("error sending email ", error)
          return false
      }
  } 
}