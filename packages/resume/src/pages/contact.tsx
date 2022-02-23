import { GetStaticProps, NextPage } from 'next';
import { getResume } from 'services';
import { pick } from 'ramda';
import { Field, Form, Input, Textarea } from 'form';
import { useForm, type SubmitHandler } from 'react-hook-form';

import {
  ButtonWithIcon,
  SuccessMessage,
  ErrorMessage,
  LoadingSpinner,
} from 'components';
import { BsArrowRight as ProceedIcon } from 'react-icons/bs';
import { CgProfile as NameIcon } from 'react-icons/cg';
import {
  MdAlternateEmail as MailIcon,
  MdOutlineSubject as SubjectIcon,
} from 'react-icons/md';

import type { Message } from 'types';
import useSendMessage from 'lib/useSendMessage';
import styles from 'styles/Contact.module.scss';

const Contact: NextPage = () => {
  const { register, handleSubmit, reset, resetField } = useForm<Message>();
  const { isLoading, isSuccess, isError, mutate } = useSendMessage({
    onSuccess: () => {
      reset();
    },
  });

  const submission: SubmitHandler<Message> = data => {
    console.log('data', data);
    mutate(new URLSearchParams(data));
  };

  const Button = ButtonWithIcon(isLoading ? LoadingSpinner : ProceedIcon);

  return (
    <div>
      {isSuccess && (
        <SuccessMessage title="Well done" className={styles.message}>
          your message are sent correctly. I&apos;ll be in touch ASAP
        </SuccessMessage>
      )}

      {isError && (
        <ErrorMessage title="Oh snap" className={styles.message}>
          something unexpected happens.
        </ErrorMessage>
      )}

      <Form className={styles.form} onSubmit={submission}>
        <div className={styles.fields}>
          <Field
            id="name"
            label="Name"
            renderInput={
              <Input
                id="name"
                type="text"
                Icon={NameIcon}
                placeholder="John Doe"
              />
            }
            className={styles.col1}
          />
          <Field
            id="email"
            label="Email"
            renderInput={
              <Input
                id="email"
                type="email"
                Icon={MailIcon}
                placeholder="johndoe@example.com"
              />
            }
            className={styles.col1}
          />
          <Field
            id="subject"
            label="Subject"
            renderInput={
              <Input
                id="subject"
                type="text"
                placeholder="write a subject"
                Icon={SubjectIcon}
              />
            }
            className={styles.col1}
          />
          <Field
            id="message"
            label="Message"
            required
            renderInput={
              <Textarea id="message" placeholder="write your message" />
            }
            className={styles.col2}
          />
        </div>

        <Button type="submit" className={styles.button} disabled={isLoading}>
          Send message
        </Button>
      </Form>
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
