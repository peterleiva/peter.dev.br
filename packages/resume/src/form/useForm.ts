import {
  ChangeEventHandler,
  FormEvent,
  FormEventHandler,
  useReducer,
} from 'react';

type State = {
  name: string;
  email: string;
  message: string;
};

type SubmitCallback = {
  (data: State, e?: FormEvent<HTMLFormElement>): void;
};

type Submission = {
  (f: SubmitCallback, prevent?: boolean): FormEventHandler<HTMLFormElement>;
};

const reducer = (state: State, data: Partial<State>): State => {
  return {
    ...state,
    ...data,
  };
};

const initializer = () => ({ name: '', email: '', message: '' });

export default function useForm() {
  const [data, dispatch] = useReducer(reducer, {}, initializer);

  const handler: (
    id: keyof State
  ) => ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = id => e =>
    dispatch({ [id]: e.target.value });

  const field = (id: keyof State) => ({
    onChange: handler(id),
    value: data[id],
  });

  const submission: Submission =
    (f, prevent = true) =>
    e => {
      prevent && e.preventDefault();
      f(data, e);
    };

  const isBlank = (id: keyof State) => data[id] === '';
  const clear = (id: keyof State) => dispatch({ [id]: '' });

  return { data, handler, field, submission, clear, isBlank };
}
