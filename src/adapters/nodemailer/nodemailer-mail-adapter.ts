import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "2bae59296ab790",
    pass: "658839f314b826"
  }
});

export class NodeMailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
  await transport.sendMail({
    from: 'Feedget team <noreply.@feedget.com>',
    to: 'Lucas Tenorio <lucas@outlook.com>',
    subject,
    html: body
  });
  }

}