import Head from 'next/head';
import type { GetStaticProps, NextPage } from 'next';
import { Section, Skills, Timeline, Header, ContactsList } from 'components';
import { getResume } from 'services';
import {
  jobDeserializer,
  educationDeserializer,
  resumeSerializer,
  SerializedResume,
} from 'lib/serializers';
import styles from '../styles/Home.module.scss';

type HomeProps = SerializedResume;

const Home: NextPage<HomeProps> = ({
  bio,
  contacts,
  skills,
  jobs,
  educations,
  courses,
}) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Peter&apos;s Résumé</title>
        <meta name="description" content="Peter's Résumé" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <Header />
      <main className={styles.main}>
        <div className={styles.profile}>
          <Section title="Profile" fill>
            <p>{bio}</p>
          </Section>
          <ContactsList contacts={contacts} />
        </div>
        <Section title="Experience">
          <Timeline jobs={jobDeserializer(jobs)} />
        </Section>
        <Section title="Education">
          {educationDeserializer(educations).map(
            ({ title, institution: { name: location } }) => (
              <div key={title}>
                <h2>{title}</h2>
                <p>{location}</p>
              </div>
            )
          )}
        </Section>
        <Section title="Courses & Training">
          {courses.map(({ courses, institution }) => (
            <div key={institution}>
              <h3>{institution}</h3>
              <ul>
                {courses.map(({ title }) => (
                  <li key={title}>{title}</li>
                ))}
              </ul>
            </div>
          ))}
        </Section>
        <Section title="Skills">
          <Skills skills={skills} />
        </Section>
      </main>
    </div>
  );
};

export default Home;

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const resume = await getResume();

  if (!resume) {
    return {
      notFound: true,
    };
  }

  return {
    props: resumeSerializer(resume),
  };
};
