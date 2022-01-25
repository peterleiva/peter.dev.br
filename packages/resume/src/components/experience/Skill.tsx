type SkillProps = {
  name: string;
};

export default function Skill({ name }: SkillProps) {
  return (
    <span className="skill">
      {name}

      <style jsx>{`
        .skill {
          position: relative;
        }

        @media screen and (hover: hover) {
          .skill:hover::after {
            transform: rotate(0deg);
            right: 0;
          }
        }

        .skill::after {
          content: ' ';
          height: 4px;
          background: var(--color-secondary);
          width: var(--space);
          position: absolute;
          bottom: 0;
          right: calc(-1 * var(--space-sm));
          transform: rotate(-20deg);
          border-radius: var(--border-radius);
          transition: 200ms;
        }
      `}</style>
    </span>
  );
}
