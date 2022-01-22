import { DateTime } from 'luxon';

type EducationProps = {
  title: string;
  educations: {
    name: string;
    end?: DateTime;
  }[];
};

export default function Education({ title, educations }: EducationProps) {
  return (
    <div className="container">
      <p className="title">{title}</p>
      {educations.map(({ name, end }) => (
        <p key={name}>
          {name}, {end?.year ?? 'Ongoing'}
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
