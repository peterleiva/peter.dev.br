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

        .skill::after {
          content: ' ';
          height: 4px;
          background: var(--color-secondary);
          width: var(--space);
          position: absolute;
          bottom: 0;
          left: calc(50% - var(--space) / 2);
          border-radius: var(--border-radius);
          transition: 200ms;
        }
      `}</style>
    </span>
  );
}
