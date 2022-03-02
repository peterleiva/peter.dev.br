import type { Job, Company } from 'types';
import Activity from './Activity';
import Techs from './Techs';

type ExperienceProps = Job;

function name(company: Company) {
  const alias = company.alias ? `${company.alias} - ` : ' ';
  return `${alias}${company.name}`;
}

export default function Experience({
  company,
  position,
  activity: { start, end },
  description,
  techs,
}: ExperienceProps) {
  return (
    <div className="container relative p-6">
      <header className="relative mb-3">
        <h3 className="font-semibold">{name(company)}</h3>
        <div className="flex gap-3 items-center">
          <p className="position">{position}</p>
          &#9474;
          <div className="flex gap-3 uppercase items-center justify-around text-center">
            <Activity time={start} /> &#9472; <Activity time={end} />
          </div>
        </div>
      </header>
      <div>{description}</div>
      <Techs techs={techs} />

      <style jsx>{`
        .container::after {
          position: absolute;
          content: '';
          width: 1px;
          height: 70%;
          top: 30%;
          left: 0;
          background: var(--color-gray-90);
        }

        header::before {
          content: '';
          width: 8px;
          height: 8px;
          border-radius: 100%;
          position: absolute;
          top: 15%;
          left: calc(-3px - var(--space));
          background: var(--color-gray-90);
        }
      `}</style>
    </div>
  );
}
