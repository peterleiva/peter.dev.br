import Skill from './Skill';
import type { Skill as ISkill } from 'types';
import { GrTools as Icon } from 'react-icons/gr';
import { FaAngleDoubleRight as RightIcon } from 'react-icons/fa';
import useToggle from 'lib/useToggle';

type TechProps = {
  techs: ISkill[];
  hide?: boolean;
};

/**
 * List of techs used in a job experience
 *
 */
export default function Techs({ techs, hide = false }: TechProps) {
  const { toggle, isOn } = useToggle(!hide);

  if (techs.length <= 0) return null;

  return (
    <div className="container">
      <button className="reset-button" onClick={toggle}>
        <Icon />
        <RightIcon
          className="toggle-indicator"
          transform={`rotate(${isOn ? '180' : '0'})`}
          style={{ transition: '150ms' }}
        />
      </button>

      {isOn && (
        <div className="techs">
          {techs.map(({ name }) => (
            <Skill key={name} name={name} />
          ))}
        </div>
      )}

      <style jsx>{`
        .container {
          margin-top: var(--space);
          display: flex;
          flex-flow: row nowrap;
          align-items: center;
          gap: var(--space);
          min-height: var(--space);
        }

        button {
          display: flex;
          justify-items: center;
        }

        .toggle-indicator {
          display: inline;
          transform-origin: center center;
        }

        .techs {
          display: flex;
          flex-flow: row wrap;
          gap: var(--space-sm) var(--space);
          align-items: center;
          justify-items: space-around;
        }
      `}</style>
    </div>
  );
}
