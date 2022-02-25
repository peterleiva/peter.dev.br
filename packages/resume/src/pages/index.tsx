import type { GetStaticProps, NextPage } from 'next';
import { Section, Skills, Timeline, Education } from 'components';
import { getResume } from 'services';
import { job, education, course, resume as serializer } from 'lib/serializers';

type HomeProps = { resume: serializer.SerializedResume };

const Home: NextPage<HomeProps> = ({
  resume: { jobs, educations, courses, skills },
}) => {
  return (
    <div className="flex flex-col gap-20">
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
