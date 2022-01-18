import Head from 'next/head';
import type { GetStaticProps, NextPage } from 'next';
import type { Education, Job, Skill } from 'types';
import { Section, Skills, Timeline, Header, ContactsList } from 'components';
import { getAllResume } from 'services';
import { jobDeserializer, educationDeserializer } from 'lib/serializers';
import { Contact } from 'models/resume';
import styles from '../styles/Home.module.scss';

type Activity = {
  start: string;
  end?: string;
};

type JobProps = Omit<Job, 'activity'> & { activity: Activity };
type CoursesProps = {
  institution: string;
  courses: {
    title: string;
    description?: string;
    started: string;
    ended?: string;
  }[];
};

type HomeProps = {
  bio?: string;
  contacts: Contact[];
  skills: Skill[];
  jobs: JobProps[];
  educations: (Omit<Education, 'started' | 'ended'> & {
    started: string;
    ended?: string;
  })[];
  courses: CoursesProps[];
};

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
  const resume = await getAllResume();

  if (!resume) {
    return {
      notFound: true,
    };
  }

  return {
    props: resume,
  };
};
