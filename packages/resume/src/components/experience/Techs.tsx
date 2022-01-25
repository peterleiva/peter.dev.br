import Skill from './Skill';
import type { Skill as ISkill } from 'types';
import { GrTools as Icon } from 'react-icons/gr';
import { FaAngleDoubleRight as RightIcon } from 'react-icons/fa';
import useToggle from 'lib/useToggle';

type TechProps = {
  techs: ISkill[];
  hide?: boolean;
};

const techKey = (tech: ISkill) => ({ key: tech.name, ...tech });

/**
 * List of techs used in a job experience
 *
 */
export default function Techs({ techs, hide = false }: TechProps) {
  const { toggle, isOn } = useToggle(!hide);

  if (techs.length <= 0) return null;

  return (
    <div className="techs">
      <button className="reset-button" onClick={toggle}>
        <Icon />
        <RightIcon
          className="toggle-indicator"
          transform={`rotate(${isOn ? '180' : '0'})`}
          style={{ transition: '150ms' }}
        />
      </button>

      {isOn && techs.map(techKey).map(Skill)}

      <style jsx>{`
        button {
          display: flex;
          justify-items: center;
        }

        .toggle-indicator {
          display: inline;
          transform-origin: center center;
        }

        .techs {
          min-height: var(--space);
          margin-top: var(--space);
          display: flex;
          flex-flow: row wrap;
          gap: var(--space);
          align-items: center;
          justify-items: space-around;
        }
      `}</style>
    </div>
  );
}
