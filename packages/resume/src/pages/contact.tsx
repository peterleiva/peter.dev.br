import { GetStaticProps, NextPage } from 'next';
import { getResume } from 'services';
import { pick } from 'ramda';
import { Field } from 'form';
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

      <form className={styles.form} onSubmit={handleSubmit(submission)}>
        <div className={styles.fields}>
          <Field
            id="name"
            label="Name"
            type="text"
            Icon={NameIcon}
            className={styles.col1}
            placeholder="John Doe"
            onClear={() => resetField('name')}
            {...register('name')}
          />
          <Field
            id="email"
            label="Email"
            type="email"
            Icon={MailIcon}
            className={styles.col1}
            placeholder="johndoe@example.com"
            onClear={() => resetField('email')}
            {...register('email')}
          />
          <Field
            id="subject"
            label="Subject"
            type="text"
            Icon={SubjectIcon}
            className={styles.col1}
            placeholder="write a subject"
            onClear={() => resetField('subject')}
            {...register('subject')}
          />
          <Field
            id="message"
            label="Message"
            className={styles.col2}
            placeholder="write your message"
            onClear={() => resetField('text')}
            required
            {...register('text', { required: true })}
          />
        </div>

        <Button type="submit" className={styles.button} disabled={isLoading}>
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
