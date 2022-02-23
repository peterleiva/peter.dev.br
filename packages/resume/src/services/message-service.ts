import type { Message } from 'types';
import { createTransport } from 'nodemailer';
import type SMTPTransport from 'nodemailer/lib/smtp-transport';

const {
  SMTP_URL,
  SMTP_ETHEREAL_USER,
  SMTP_ETHEREAL_PASS,
  EMAIL_RECIPIENT = 'job@peter.dev.br',
} = process.env;

function createTransportConfig():
  | string
  | SMTPTransport
  | SMTPTransport.Options {
  if (process.env.NODE_ENV === 'production') {
    if (!SMTP_URL) {
      throw new Error('production environment must define SMTP_URL');
    }

    return SMTP_URL;
  } else {
    if (!SMTP_URL && !SMTP_ETHEREAL_PASS && !SMTP_ETHEREAL_USER) {
      throw new Error(
        'you must define SMTP_ETHEREAL_USER and SMTP_ETHEREAL_PASS or just SMT_URL environment variable'
      );
    }

    return (
      SMTP_URL ?? {
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
          user: SMTP_ETHEREAL_USER,
          pass: SMTP_ETHEREAL_PASS,
        },
      }
    );
  }
}

function nodemailerService({
  email: address = 'unknown',
  name = 'unknown',
  subject,
  text,
}: Message) {
  const transporter = createTransport(createTransportConfig());

  return {
    sendMail() {
      return new Promise((resolve, reject) => {
        transporter.sendMail(
          {
            from: {
              name,
              address,
            },
            to: EMAIL_RECIPIENT,
            subject: subject ?? 'Message from Resume application',
            text,
          },
          (err, info) => {
            if (err) {
              console.error('transport info object: ', info);
              reject(err);
            } else {
              resolve(info);
            }
          }
        );
      });
    },
  };
}

export async function sendMessage(message: Message): Promise<Message> {
  const mailer = nodemailerService(message);
  await mailer.sendMail();
  return message;
}
