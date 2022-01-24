import { useState } from 'react';
import { Skill, Tag as ITag } from 'types';
import Tag from './Tag';
import useTags from './useTags';
import useSkillsByTag from './useSkillsByTag';
import SkillsList from './SkillsList';
import Error from './Error';
import Loading from './Loading';
import { TabPanel, Tabs, Tab } from '../tabs';
import { UseQueryResult } from 'react-query';
import { pick } from 'ramda';
import useAllSkills from './useAllSkills';

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

  return (
    <Tabs defaultValue="All">
      <section className="tags">
        <Tab id="All">
          {activated => <Tag name="All" activated={activated} />}
        </Tab>

        {tags?.map(name => (
          <Tab key={name} id={name} onSelect={setTag}>
            {activated => <Tag key={name} name={name} activated={activated} />}
          </Tab>
        ))}

        {isLoadingTags && <span>&#8411;</span>}
      </section>

      <TabPanel id="All">
        <Wrapper {...getStates({ data: allSkills.skills, ...allSkills })} />
      </TabPanel>

      <TabPanel id={tag}>
        <Wrapper {...getStates({ data: skillsByTag.skills, ...skillsByTag })} />
      </TabPanel>

      <style jsx>{`
        .tags {
          display: flex;
          flex-flow: row wrap;
        }
      `}</style>
    </Tabs>
  );
}
