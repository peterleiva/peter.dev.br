import React from 'react';
import { type QueryObserverBaseResult } from 'react-query';
import { Skill } from 'types';
import Error from './Error';
import Loading from './Loading';

type SkillsListProps = {
  skills?: Skill[];
  isLoading: boolean;
  isFetching: boolean;
  refetch: QueryObserverBaseResult['refetch'];
  isError: boolean;
};

export default function SkillsList({
  skills,
  isLoading,
  isFetching,
  refetch,
  isError,
}: SkillsListProps) {
  if (isLoading || isFetching) {
    return <Loading />;
  }

  if (isError || !skills) {
    return <Error refetch={refetch} />;
  }

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
