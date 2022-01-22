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
import getResume from 'services';
import { job, education, course, resume as serializer } from 'lib/serializers';
import styles from '../styles/Home.module.scss';

type HomeProps = { resume: serializer.SerializedResume };

const Home: NextPage<HomeProps> = ({
  resume: { name, jobTitle, contacts, bio, jobs, educations, courses, skills },
}) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>{name}&apos;s Résumé</title>
        <meta name="description" content={`${name}'s Résumé`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <div className={styles.top}>
        <Header name={name} jobTitle={jobTitle} />
        <div className={styles.profile}>
          <Section title="Profile" fill>
            <p>{bio}</p>
          </Section>
          <ContactsList contacts={contacts} />
        </div>
      </div>

      <main className={styles.main}>
        <Section title="Experience">
          <Timeline jobs={job.deserialize(jobs)} />
        </Section>
        <Section title="Education">
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
        <Section title="Courses & Training">
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
