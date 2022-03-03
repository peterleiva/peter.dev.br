import type { GetStaticProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Section, Skills, Timeline, Education } from 'components';
import { getResume } from 'services';
import { job, education, course, resume as serializer } from 'lib/serializers';
import { useTranslation } from 'next-i18next';

type HomeProps = { resume: serializer.SerializedResume };

const Home: NextPage<HomeProps> = ({
  resume: { jobs, educations, courses, skills },
}) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-20">
      <Section title={t('sections.experience')}>
        <Timeline jobs={job.deserialize(jobs)} />
      </Section>
      <Section title={t('sections.education')}>
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
      <Section title={t('sections.courses_trainings')}>
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
      <Section title={t('sections.skills')}>
        <Skills skills={skills} />
      </Section>
    </div>
  );
};

export default Home;

export const getStaticProps: GetStaticProps<HomeProps> = async ({
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
      resume: serializer.serialize(resume),
    },
  };
};
