import {
  ChangeEventHandler,
  FormEvent,
  FormEventHandler,
  useReducer,
} from 'react';
import { GetStaticProps, NextPage } from 'next';
import { getResume } from 'services';
import { pick } from 'ramda';
import { ButtonWithIcon, Field } from 'components';
import { BsArrowRight as ButtonIcon } from 'react-icons/bs';
import { CgProfile as NameIcon } from 'react-icons/cg';
import { MdAlternateEmail as MailIcon } from 'react-icons/md';
import styles from 'styles/Contact.module.scss';

const Button = ButtonWithIcon(ButtonIcon);

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

const useFormData = () => {
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
};

const Contact: NextPage = () => {
  const { field, submission, clear, isBlank } = useFormData();

  return (
    <div>
      <h2 className={styles.title}>\Contact</h2>
      <form
        method="post"
        className={styles.form}
        onSubmit={submission(data => console.log(data))}
      >
        <div className={styles.fields}>
          <Field
            id="name"
            label="Name"
            type="text"
            Icon={NameIcon}
            className={styles.col1}
            placeholder="John Doe"
            onClear={() => clear('name')}
            showClear={!isBlank('name')}
            {...field('name')}
          />
          <Field
            id="email"
            label="Email"
            type="email"
            Icon={MailIcon}
            className={styles.col1}
            placeholder="johndoe@example.com"
            onClear={() => clear('email')}
            showClear={!isBlank('email')}
            {...field('email')}
          />
          <Field
            id="message"
            label="Message"
            className={styles.col2}
            placeholder="write your message"
            onClear={() => clear('message')}
            showClear={!isBlank('message')}
            required
            {...field('message')}
          />
        </div>

        <Button type="submit" className={styles.button}>
          Send message
        </Button>
      </form>
    </div>
  );
};

export default Contact;

export const getStaticProps: GetStaticProps = async () => {
  const resume = await getResume();

  if (!resume) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      resume: pick(['name', 'jobTitle'], resume),
    },
  };
};
