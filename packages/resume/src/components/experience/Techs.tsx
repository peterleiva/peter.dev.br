import Skill from './Skill';
import type { Skill as ISkill } from 'types';
import { GrTools as Icon } from 'react-icons/gr';

type TechProps = { techs: ISkill[] };

const techKey = (tech: ISkill) => ({ key: tech.name, ...tech });

/**
 * List of techs used in a job experience
 *
 */
export default function Techs({ techs }: TechProps) {
  if (techs.length <= 0) return null;

  return (
    <div className="techs">
      <Icon />
      {techs.map(techKey).map(Skill)}

      <style jsx>{`
        .techs {
          margin-top: var(--space);
          display: flex;
          flex-flow: row wrap;
          gap: var(--space);
          align-items: center;
          justify-items: justify-content;
        }
      `}</style>
    </div>
  );
}
