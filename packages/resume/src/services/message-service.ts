import type { Message } from 'types';

export async function sendMessage(message: Message): Promise<Message> {
  throw new Error('must be implemented');
}
