import { PASS, UI_URL, USER } from '@/config';
import nodemailer from 'nodemailer';

export interface DataSendMail {
  email: string;
  message: MessageSendMail;
}

export interface MessageSendMail {
  subject: string;
  text: string;
  title: string;
  link: string;
}

async function sendMail(data: DataSendMail): Promise<any> {
  const { email, message } = data;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: USER, // generated ethereal user
      pass: PASS,
    },
  });
  await transporter.sendMail({
    from: '"NTH TEAM 👻" <nguyentamhoang12a@gmail.com>', // sender address
    to: email, // list of receivers
    subject: message.subject, // Subject line
    text: message.text, // plain text body
    html: `<div style="display:flex,flex-direction:column">
    <b>${message.title}</b>
    <a style="background-color:#135ead; padding:1rem; border-radius:0.5rem; color:white"
    href="${message.link}">Click me!</a>
    </>`, // html body
  });
}

export default sendMail;
