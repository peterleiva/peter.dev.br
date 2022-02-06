import { useMutation, UseMutationOptions } from 'react-query';
import type { Errors } from 'pages/api/contact';
import type { Message } from 'types';

const postContact = (message: URLSearchParams) =>
  fetch('/api/contact', {
    method: 'POST',
    body: message,
    headers: new Headers({
      'Content-Type': 'application/x-www-form-urlencoded',
    }),
  })
    .then(async res => {
      if (!res.ok) {
        if (/4\d{2}/.test('' + res.status)) {
          const errors = await res.json();
          throw await errors;
        } else {
          throw await res.text();
        }
      }

      return res;
    })
    .then(async res => {
      return (await res.json()) as Message;
    });

export default function useSendMessage(
  options: Omit<
    UseMutationOptions<Message, Errors, URLSearchParams>,
    'mutationKey' | 'mutationFn'
  >
) {
  const mutation = useMutation<Message, Errors, URLSearchParams>(
    'contact',
    postContact,
    options
  );

  return mutation;
}
