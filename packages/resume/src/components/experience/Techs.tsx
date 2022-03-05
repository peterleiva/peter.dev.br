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
    <div className="print:hidden container flex flex-row flex-nowrap items-center gap-5 mt-8 min-h-8">
      <button
        className="reset-button flex justify-items-center"
        onClick={toggle}
      >
        <Icon />
        <RightIcon
          className="origin origin inline"
          transform={`rotate(${isOn ? '180' : '0'})`}
          style={{ transition: '150ms' }}
        />
      </button>

      {isOn && (
        <div className="techs flex flex-row flex-wrap items-center">
          {techs.map(({ name }) => (
            <Skill key={name} name={name} />
          ))}
        </div>
      )}

      <style jsx>{`
        .techs {
          gap: var(--space-sm) var(--space);
          justify-items: space-around;
        }
      `}</style>
    </div>
  );
}
