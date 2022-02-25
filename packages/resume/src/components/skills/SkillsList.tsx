import React from 'react';
import { Skill } from 'types';

type SkillsListProps = {
  skills: Skill[];
};

export default function SkillsList({ skills }: SkillsListProps) {
  return (
    <ul className="px-4">
      {skills.map(({ name }) => (
        <li key={name} className="list-disc list-inside">
          {name}
        </li>
      ))}
    </ul>
  );
}
