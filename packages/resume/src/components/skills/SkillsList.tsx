import React from 'react';
import { Skill } from 'types';

type SkillsListProps = {
  skills: Skill[];
};

export default function SkillsList({ skills }: SkillsListProps) {
  return (
    <ul>
      {skills.map(({ name }) => (
        <li key={name}>{name}</li>
      ))}
    </ul>
  );
}
