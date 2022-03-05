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
    <div className="container relative">
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
      <div className="text-justify mt-2">{description}</div>
      <Techs techs={techs} />

      <style jsx>{`
        .container {
          padding: var(--space);
        }
        .container:first-child::after {
          top: 34px;
        }

        .container::after {
          position: absolute;
          content: '';
          width: 1px;
          height: 100%;
          top: 0;
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
          left: calc(-1 * (var(--space) + 3px));
          background: var(--color-gray-90);
        }
      `}</style>
    </div>
  );
}
