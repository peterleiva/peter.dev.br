import type { Job, Company } from 'types';
import Activity from './Activity';
import Skill from './Skill';
import { map, pipe } from 'ramda';
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
    <div className="container">
      <header>
        <h3>{name(company)}</h3>
        <div className="subtitle">
          <p className="position">{position}</p>
          &#9474;
          <div className="activity">
            <Activity time={start} /> &#9472; <Activity time={end} />
          </div>
        </div>
      </header>
      <div>{description}</div>
      <Techs techs={techs} />

      <style jsx>{`
        .container {
          position: relative;
          padding: var(--space);
        }

        .container::after {
          position: absolute;
          content: '';
          width: 1px;
          height: 70%;
          top: 30%;
          left: 0;
          background: var(--color-gray-90);
        }

        header {
          position: relative;
          margin-bottom: var(--space-sm);
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

        .activity {
          display: flex;
          gap: var(--space-xs);
          text-transform: uppercase;
          align-items: center;
          justify-content: space-around;
          text-align: center;
        }

        .subtitle {
          display: flex;
          gap: var(--space-xs);
          align-items: center;
        }
      `}</style>
    </div>
  );
}
