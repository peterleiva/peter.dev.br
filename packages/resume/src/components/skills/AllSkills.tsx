import React, { SyntheticEvent, useState } from 'react';
import type { Skill } from 'types';
import SkillsList from './SkillsList';
import useAllSkills from './useAllSkills';

type AllSkillsProps = {
  initialData: Skill[];
};

export default function AllSkills({ initialData }: AllSkillsProps) {
  const { skills, isError, isLoading, isFetching, refetch } = useAllSkills(
    initialData
  );

  const tryAgain = (e: SyntheticEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    refetch();
  };

  if (isError || !skills) {
    return (
      <p className="text-error">
        Error fetching skills. Please,{' '}
        <a href="" onClick={tryAgain}>
          try again
        </a>
        . If persist contact me at{' '}
        <a href="mailto:contact@peter.dev.br">contact@peter.dev.br</a>
        <style jsx>{`
          p {
            margin-top: var(--space);
          }
        `}</style>
      </p>
    );
  }

  if (isLoading || isFetching) {
    return (
      <ul>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <style jsx>{`
          li {
            height: var(--space-sm);
            margin-bottom: var(--space-xs);
            width: var(--space-lg);
            background-color: var(--color-gray-90);
          }
        `}</style>
      </ul>
    );
  }

  return <SkillsList skills={skills} />;
}
