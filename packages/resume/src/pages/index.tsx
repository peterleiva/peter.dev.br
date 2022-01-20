import Head from 'next/head';
import type { GetStaticProps, NextPage } from 'next';
import { Section, Skills, Timeline, Header, ContactsList } from 'components';
import getResume from 'services';
import { job, education, resume as serializer } from 'lib/serializers';
import styles from '../styles/Home.module.scss';

type HomeProps = { resume: serializer.SerializedResume };

const Home: NextPage<HomeProps> = ({
  resume: { contacts, bio, jobs, educations, courses, skills },
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
          <Timeline jobs={job.deserialize(jobs)} />
        </Section>
        <Section title="Education">
          {education
            .deserialize(educations)
            .map(({ title, institution: { name: location } }) => (
              <div key={title}>
                <h2>{title}</h2>
                <p>{location}</p>
              </div>
            ))}
        </Section>
        <Section title="Courses & Training">
          {courses.map(({ courses: trainings, institution }) => (
            <div key={institution}>
              <h3>{institution}</h3>
              <ul>
                {trainings.map(({ title }) => (
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
    props: { resume: serializer.serialize(resume) },
  };
};
