import { DateTime } from 'luxon';
import { useTranslation } from 'next-i18next';

type EducationProps = {
  title: string;
  educations: {
    name: string;
    end?: DateTime;
  }[];
};

export default function Education({ title, educations }: EducationProps) {
  const { t } = useTranslation();
  return (
    <div className="container">
      <p className="title">{title}</p>
      {educations.map(({ name, end }) => (
        <p key={name}>
          {name}, {end?.year ?? t('ongoing')}
        </p>
      ))}

      <style jsx>{`
        .container {
          margin-bottom: var(--space);
        }

        .title {
          font-weight: var(--weight-bold);
        }
      `}</style>
    </div>
  );
}
