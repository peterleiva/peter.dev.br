import { useState } from 'react';
import { Skill, Tag as ITag } from 'types';
import Tag from './Tag';
import useTags from './useTags';
import useSkillsByTag from './useSkillsByTag';
import SkillsList from './SkillsList';
import Error from './Error';
import Loading from './Loading';
import { Tabs } from '../tabs';
import { UseQueryResult } from 'react-query';
import { pick } from 'ramda';
import useAllSkills from './useAllSkills';
import { useTranslation } from 'next-i18next';

type SkillsProps = {
  skills: Skill[];
};

function Wrapper({
  isLoading,
  isFetching,
  refetch,
  isError,
  data,
}: Pick<
  UseQueryResult<Skill[] | undefined>,
  'isLoading' | 'isFetching' | 'refetch' | 'isError' | 'data'
>) {
  if (isLoading || isFetching) {
    return <Loading />;
  }

  if (isError || !data) {
    return <Error refetch={refetch} />;
  }

  return <SkillsList skills={data} />;
}

const getStates = pick([
  'isLoading',
  'isFetching',
  'isError',
  'data',
  'refetch',
]);

export default function Skills({ skills: initialData }: SkillsProps) {
  const { tags, isLoading: isLoadingTags } = useTags();
  const [tag, setTag] = useState<ITag | undefined>();
  const skillsByTag = useSkillsByTag(tag);
  const allSkills = useAllSkills(initialData);
  const { t } = useTranslation();

  return (
    <Tabs defaultValue="All">
      <section className="flex flex-row flex-wrap mb-5">
        <Tabs.Tab id="All">
          {activated => <Tag name={t('all')} activated={activated} />}
        </Tabs.Tab>

        {tags?.map(name => (
          <Tabs.Tab key={name} id={name} onSelect={setTag}>
            {activated => <Tag key={name} name={name} activated={activated} />}
          </Tabs.Tab>
        ))}

        {isLoadingTags && <span>&#8411;</span>}
      </section>

      <Tabs.Panel id="All">
        <Wrapper {...getStates({ data: allSkills.skills, ...allSkills })} />
      </Tabs.Panel>

      <Tabs.Panel id={tag}>
        <Wrapper {...getStates({ data: skillsByTag.skills, ...skillsByTag })} />
      </Tabs.Panel>
    </Tabs>
  );
}
