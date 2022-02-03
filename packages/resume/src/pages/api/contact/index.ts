import { NextApiHandler } from 'next';
import { sendMessage, Message } from 'services';

type Errors = {
  errors: {
    [error: string]: {
      reason: string;
      value: unknown;
    };
  };
};

const errors: Errors = { errors: {} };

const handler: NextApiHandler<Message | Errors | string> =
  async function handler(req, res) {
    if (req.method !== 'POST') {
      res.status(405).send('only accept POST method. Received: ' + req.method);
      return;
    }

    const { message, name, email } = req.body;

    if (!message && typeof message !== 'string') {
      errors.errors.message = {
        reason: 'message is required and must be a string',
        value: '' + message,
      };

      res.status(400).send(errors);
      return;
    }

    try {
      const sent = await sendMessage({ text: message as string, name, email });
      res.status(200).json(sent);
    } catch (error) {
      console.error(error);
      res.status(500).send("coulnd't send message");
    }
  };

export default handler;
