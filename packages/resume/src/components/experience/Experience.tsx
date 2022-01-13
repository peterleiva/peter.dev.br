import type { Job, Company } from 'types';
import Activity from './Activity';

type ExperienceProps = Job;

function name(company: Company) {
  const alias = company.alias ? company.alias + ' - ' : ' ';
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
    <div>
      <header>
        <h1>{name(company)}</h1>
        <h2>{position}</h2>
        <div>
          <Activity time={start} /> - <Activity time={end} />
        </div>
      </header>
      <div>{description}</div>

      {techs.length > 0 && (
        <div>
          <i>Techs: </i>
          <ol>
            {techs.map(skill => (
              <li key={skill.name}>{skill.name}</li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
