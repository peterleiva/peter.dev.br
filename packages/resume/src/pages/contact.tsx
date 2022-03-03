import { type GetServerSideProps, type NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { getResume } from 'services';
import { pick } from 'ramda';
import { Field, Form, Input, Textarea } from 'form';
import { type SubmitHandler } from 'react-hook-form';

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
import { useTranslation } from 'next-i18next';

const Contact: NextPage = () => {
  const { isLoading, isSuccess, isError, mutate } = useSendMessage();
  const { t } = useTranslation('contact');

  const submission: SubmitHandler<Message> = data => {
    mutate(new URLSearchParams(data));
  };

  const Button = ButtonWithIcon(isLoading ? LoadingSpinner : ProceedIcon);

  return (
    <div>
      {isSuccess && (
        <SuccessMessage
          title={t('flash_message.success.title')}
          className={styles.message}
        >
          {t('flash_message.success.description')}
        </SuccessMessage>
      )}

      {isError && (
        <ErrorMessage
          title={t('flash_message.failure.title')}
          className={styles.message}
        >
          {t('flash_message.failure.description')}
        </ErrorMessage>
      )}

      <Form className={styles.form} onSubmit={submission}>
        <div className={styles.fields}>
          <Field
            id="name"
            label={t('fields.name.label')}
            renderInput={
              <Input
                id="name"
                type="text"
                Icon={NameIcon}
                placeholder={t('fields.name.placeholder')}
              />
            }
            className={styles.col1}
          />
          <Field
            id="email"
            label={t('fields.email.label')}
            renderInput={
              <Input
                id="email"
                type="email"
                Icon={MailIcon}
                placeholder={t('fields.email.placeholder')}
              />
            }
            className={styles.col1}
          />
          <Field
            id="subject"
            label={t('fields.subject.label')}
            renderInput={
              <Input
                id="subject"
                type="text"
                placeholder={t('fields.subject.placeholder')}
                Icon={SubjectIcon}
              />
            }
            className={styles.col1}
          />
          <Field
            id="text"
            label={t('fields.message.label')}
            required
            renderInput={
              <Textarea
                id="text"
                placeholder={t('fields.message.placeholder')}
                required
              />
            }
            className={styles.col2}
          />
        </div>

        <Button type="submit" className={styles.button} disabled={isLoading}>
          {t('submit')}
        </Button>
      </Form>
    </div>
  );
};

export default Contact;

export const getServerSideProps: GetServerSideProps = async ({
  locale = '',
}) => {
  const translations = await serverSideTranslations(locale);

  const resume = await getResume();

  if (!resume) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      ...translations,
      resume: pick(['name', 'jobTitle'], resume),
    },
  };
};
