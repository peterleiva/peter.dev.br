import Head from 'next/head';
import type { GetStaticProps, NextPage } from 'next';
import type { Job, Skill } from 'types';
import { Section, Skills, Timeline, Header } from 'components';
import { DateTime } from 'luxon';
import { map, evolve, pick, isNil, ifElse } from 'ramda';
import {
  EducationReturn,
  getSkills,
  getCourses,
  getResume,
  getEducations,
  getJobs,
} from 'lib';
import { connect, disconnect } from 'lib/database';
import { Contact } from 'models/resume';
import styles from '../styles/Home.module.scss';

type Activity = {
  start: string;
  end?: string;
};

const experience = map(
  evolve({
    activity: {
      start: DateTime.fromISO,
      end: DateTime.fromISO,
    },
  })
);

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
  educations: EducationReturn[];
  courses: CoursesProps[];
};

const Home: NextPage<HomeProps> = ({
  bio,
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
        <Section title="Profile" fill>
          <p>{bio}</p>
          <address>
            <ol>
              <li>
                <a href="https://github.com/pherval">GitHub</a>
              </li>
              <li>
                <a href="mailto:contact@peter.dev.br">contact@peter.dev.br</a>
              </li>
            </ol>
            <br />
          </address>
        </Section>
        <Section title="Experience">
          <Timeline jobs={experience(jobs)} />
        </Section>
        <Section title="Education">
          {educations.map(({ title, institution: { name: location } }) => (
            <div key={title}>
              <h2>{title}</h2>
              <p>{location}</p>
            </div>
          ))}
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

const toISO = (date: DateTime) => date.toISO();

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const db = await connect();

  const resume = await getResume();

  if (!resume) {
    return {
      notFound: true,
    };
  }

  const [skills, educations, jobs, courses] = await Promise.all([
    getSkills(resume),
    getEducations(resume),
    getJobs(resume),
    getCourses(resume),
  ]);

  const { bio, contacts } = evolve({
    contacts: map<Contact, Pick<Contact, 'link' | 'name' | 'username'>>(
      pick(['link', 'name', 'username'])
    ),
  })(resume);

  await disconnect(db);

  const optionalDate = ifElse(isNil, () => undefined, toISO);

  return {
    props: {
      bio,
      contacts,
      jobs: map(
        evolve({
          activity: {
            start: toISO,
            end: optionalDate,
          },
        })
      )(jobs),
      skills,
      educations,
      courses,
    },
    revalidate: 60 * 60 * 24, // invalidate cache after 1 day
  };
};
