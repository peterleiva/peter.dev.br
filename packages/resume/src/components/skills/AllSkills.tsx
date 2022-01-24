import type { Skill } from 'types';
import Error from './Error';
import Loading from './Loading';
import SkillsList from './SkillsList';
import useAllSkills from './useAllSkills';

type AllSkillsProps = {
  initialData: Skill[];
};

export default function AllSkills({ initialData }: AllSkillsProps) {
  const { skills, isError, isLoading, isFetching, refetch } = useAllSkills(
    initialData
  );

  if (isError || !skills) {
    return <Error refetch={refetch} />;
  }

  if (isLoading || isFetching) {
    return <Loading />;
  }

  return <SkillsList skills={skills} />;
}
