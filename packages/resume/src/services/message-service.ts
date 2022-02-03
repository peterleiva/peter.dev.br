export type Message = {
  name?: string;
  email?: string;
  text: string;
};

export async function sendMessage(message: Message): Promise<Message> {
  throw new Error('must be implemented');
}
