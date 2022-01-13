import Head from 'next/head';
import type { GetStaticProps, NextPage } from 'next';
import type { Course, Education, Job, Skill, Training } from 'types';
import { Section, Skills, Timeline } from 'components';
import { DateTime } from 'luxon';
import { map, evolve } from 'ramda';
import styles from '../styles/Home.module.css';

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

type HomeProps = {
  skills: Skill[];
  jobs: JobProps[];
  educations: Education[];
  trainings: (Pick<Training, 'location'> & {
    courses: (Pick<Course, 'title'> & { started?: string; ended: string })[];
  })[];
};

const Home: NextPage<HomeProps> = ({ skills, jobs, educations, trainings }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Peter&apos;s Résumé</title>
        <meta name="description" content="Peter's Résumé" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>

      <header>
        <section>
          <h1>Peter</h1>
          <h2>Javascript Full-Stack Developer</h2>
        </section>
        <nav>
          <ul>
            <li>Download</li>
            <li>Contact Me</li>
            <li>Print</li>
          </ul>
        </nav>
      </header>
      <main className={styles.main}>
        <Section title="Perfil">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            vehicula ut orci convallis bibendum. Vestibulum quis mauris non mi
            consequat lobortis. Duis gravida urna urna, vitae blandit massa
            congue quis. Sed eleifend sem sed nisl pharetra feugiat. Vestibulum
            vel lorem ac orci pretium viverra vitae quis eros. Nam at eros dui.
            Sed molestie sed sapien id sagittis. Ut aliquam porta risus et
            euismod. Etiam libero purus, lobortis in sagittis a, molestie id
            nisi. Ut dapibus dictum magna elementum dictum. Donec at odio
            convallis, pretium dui in, scelerisque velit. Quisque mollis euismod
            tortor sed fermentum. Fusce mattis, eros a maximus condimentum, orci
            neque euismod lacus, vel dictum nisl enim mollis risus. Nunc
            fringilla condimentum erat, eget imperdiet nunc sodales vel. In non
            cursus augue. Phasellus velit massa, sodales ac orci vitae, lobortis
            hendrerit urna. Sed ornare metus in eros dapibus, vel ultricies
            mauris consequat. Duis ac purus sit amet est egestas vehicula. Nunc
            ipsum justo, semper quis dapibus a, consequat et nibh. Vestibulum ac
            malesuada arcu. Curabitur porta, diam eget efficitur auctor, ipsum
            diam interdum lorem, et aliquam ligula libero vitae risus. Proin
            accumsan tincidunt sapien, a faucibus nunc vehicula in. Interdum et
            malesuada fames ac ante ipsum primis in faucibus.
          </p>
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
        <Section title="Experiência">
          <Timeline jobs={experience(jobs)} />
        </Section>
        <Section title="Educação">
          {educations.map(({ title, status, location }) => (
            <div key={title}>
              <h2>
                {title}, {status}
              </h2>
              <p>{location}</p>
            </div>
          ))}
        </Section>
        <Section title="Cursos e Treinamento">
          {trainings.map(({ courses, location }) => (
            <div key={location}>
              <h3>{location}</h3>
              <ul>
                {courses.map(({ title }) => (
                  <li key={title}>{title}</li>
                ))}
              </ul>
            </div>
          ))}
        </Section>
        <Section title="Habilidades">
          <Skills skills={skills} />
        </Section>
      </main>
    </div>
  );
};

export default Home;

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  return {
    props: {
      jobs: [
        {
          company: {
            name: 'Superintendência de Tecnologia da Informação - UFF',
            alias: 'STI UFF',
          },
          position: 'Software Developer - Internship',
          description:
            'Worked mainly on back-end development with Ruby on Rails. Acted directly on the maintenance of the University’s wide range of systems involved in whole stack. Using Redmine as a direct communication point to the users to fix bugs and develop new features.',
          activity: {
            start: DateTime.now().minus({ years: 2 }).toISO(),
          },
          techs: [],
        },
      ],
      skills: [
        { name: 'javascript', tags: [] },
        { name: 'Rust', tags: [] },
      ],
      educations: [
        {
          title: "Bachelor's Degree in Computer Science",
          status: 'Ongoing',
          location: 'Universidade Federal Fluminense ',
        },
      ],
      trainings: [
        {
          location: 'MongoDB University',
          courses: [
            {
              title: 'Data Modeling',
              ended: DateTime.now().minus({ years: 1 }).toISO(),
            },
          ],
        },
      ],
    },
    revalidate: 60 * 60 * 24, // invalidate cache after 1 day
  };
};
