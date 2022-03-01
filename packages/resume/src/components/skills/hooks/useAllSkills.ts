import { useQuery } from 'react-query';
import type { Skill } from 'types';
import { getJsonOrThrow } from './helpers';

const fetchAllSkills = () => fetch('/api/skills').then(getJsonOrThrow);

export default function useAllSkills(initial: Skill[]) {
  const { data: skills, ...rest } = useQuery<Skill[]>(
    'skills',
    fetchAllSkills,
    { initialData: initial }
  );

  return { skills, ...rest };
}
