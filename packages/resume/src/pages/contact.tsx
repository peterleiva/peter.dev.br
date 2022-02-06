import { GetStaticProps, NextPage } from 'next';
import { getResume } from 'services';
import { pick } from 'ramda';
import { Field, useForm, SubmitHandler } from 'form';
import {
  ButtonWithIcon,
  SuccessMessage,
  ErrorMessage,
  LoadingSpinner,
} from 'components';
import { BsArrowRight as ProceedIcon } from 'react-icons/bs';
import { CgProfile as NameIcon } from 'react-icons/cg';
import { MdAlternateEmail as MailIcon } from 'react-icons/md';
import useSendMessage from 'lib/useSendMessage';
import styles from 'styles/Contact.module.scss';

const Contact: NextPage = () => {
  const { field, submission, clear, isBlank } = useForm();
  const { isLoading, isSuccess, isError, error, mutate } = useSendMessage({
    onSuccess: () => {
      clear();
    },
  });

  const handleSubmit: SubmitHandler = data => {
    mutate(new URLSearchParams(data));
  };

  const Button = ButtonWithIcon(isLoading ? LoadingSpinner : ProceedIcon);

  return (
    <div>
      {isSuccess && (
        <SuccessMessage title="Well done">
          your message are sent correctly. I&apos;ll be in touch ASAP
        </SuccessMessage>
      )}

      {isError && (
        <ErrorMessage title="Oh snap">
          something unexpected happens.
        </ErrorMessage>
      )}

      <form
        method="post"
        className={styles.form}
        onSubmit={submission(handleSubmit)}
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
