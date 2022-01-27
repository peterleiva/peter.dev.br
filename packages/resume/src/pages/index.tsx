import Head from 'next/head';
import type { GetStaticProps, NextPage } from 'next';
import {
  Section,
  Skills,
  Timeline,
  Header,
  ContactsList,
  Education,
} from 'components';
import { SiNextdotjs as NextIcon } from 'react-icons/si';
import { getResume } from 'services';
import { job, education, course, resume as serializer } from 'lib/serializers';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { LanguageSwitcher } from 'i18n';
import pkg from '../../package.json';
import styles from '../styles/Home.module.scss';

type HomeProps = { resume: serializer.SerializedResume };

const Home: NextPage<HomeProps> = ({
  resume: { name, jobTitle, contacts, bio, jobs, educations, courses, skills },
}) => {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <Head>
        <title>{t('resume', { name })}</title>
        <meta name="description" content={t('resume', { name })} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.top}>
        <div className="header">
          <LanguageSwitcher />
          <Header name={name} jobTitle={jobTitle} />
        </div>
        <div className={styles.profile}>
          <Section title={t('profile')} fill>
            <p>{bio}</p>
          </Section>
          <ContactsList contacts={contacts} />
        </div>
      </div>

      <main className={styles.main}>
        <Section title={t('experience')}>
          <Timeline jobs={job.deserialize(jobs)} />
        </Section>
        <Section title={t('education')}>
          {education
            .deserialize(educations)
            .map(({ title, institution: { name }, ended }) => (
              <Education
                key={title}
                title={title}
                educations={[{ name, end: ended }]}
              />
            ))}
        </Section>
        <Section title={t('courses_traning')}>
          {course
            .deserialize(courses)
            .map(({ courses: trainings, institution }) => (
              <Education
                key={institution}
                title={institution}
                educations={trainings.map(({ title, ended }) => ({
                  end: ended,
                  name: title,
                }))}
              />
            ))}
        </Section>
        <Section title={t('skills')}>
          <Skills skills={skills} />
        </Section>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://nextjs.org"
          target="_blank"
          rel="noreferrer"
          className={styles.built}
        >
          {t('footer.built')}
          <NextIcon style={{ color: 'var(--color-black)' }} />
        </a>
        <small>v{pkg.version}</small>
      </footer>
    </div>
  );
};

export default Home;

export const getStaticProps: GetStaticProps<HomeProps> = async ({ locale }) => {
  const resume = await getResume();

  if (!resume) {
    return {
      notFound: true,
    };
  }

  let props = {
    resume: serializer.serialize(resume),
  };

  if (locale) {
    props = { ...props, ...(await serverSideTranslations(locale, ['common'])) };
  }

  return {
    props,
  };
};
