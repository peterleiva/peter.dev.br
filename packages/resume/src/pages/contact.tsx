import { GetStaticProps } from 'next';
import { NextPage } from 'next';
import { getResume } from 'services';
import { pick } from 'ramda';
import { ButtonWithIcon, Field } from 'components';
import { BsArrowRight as ButtonIcon } from 'react-icons/bs';
import { CgProfile as NameIcon } from 'react-icons/cg';
import { MdAlternateEmail as MailIcon } from 'react-icons/md';
import styles from 'styles/Contact.module.scss';

const Contact: NextPage = () => {
  return (
    <div>
      <h2 className={styles.title}>\Contact</h2>
      <form method="post" className={styles.form}>
        <div className={styles.controls}>
          <Field
            id="name"
            label="Name"
            type="text"
            Icon={NameIcon}
            className={styles.col1}
            placeholder="John Doe"
          />
          <Field
            id="contact"
            label="Contact"
            type="text"
            Icon={MailIcon}
            className={styles.col1}
            placeholder="johndoe@example.com or https://t.me/<your-username> ..."
          />
          <Field
            id="message"
            label="Message"
            className={styles.col2}
            placeholder="write your message"
            required
          />
        </div>

        <ButtonWithIcon className={styles.button} Icon={ButtonIcon}>
          Send message
        </ButtonWithIcon>
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
