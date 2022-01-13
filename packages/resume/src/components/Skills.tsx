import type { Skill } from 'types';

type SkillsProps = {
  skills: Skill[];
};

export default function Skills({ skills }: SkillsProps) {
  return (
    <ul>
      {skills.map(({ name }) => (
        <li key={name}>{name}</li>
      ))}
    </ul>
  );
}
