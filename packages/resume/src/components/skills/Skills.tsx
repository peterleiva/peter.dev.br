import { useState } from 'react';
import { Skill, Tag as ITag } from 'types';
import Tag from './Tag';
import useTags from './useTags';
import useSkillsByTag from './useSkillsByTag';
import SkillsList from './SkillsList';
import AllSkills from './AllSkills';
import Error from './Error';
import Loading from './Loading';
import { TabPanel, Tabs, Tab } from '../tabs';

type SkillsProps = {
  skills: Skill[];
};

export default function Skills({ skills: initialData }: SkillsProps) {
  const { tags, isLoading: isLoadingTags, isFetching, refetch } = useTags();
  const [tag, setTag] = useState<ITag | undefined>();
  const { skills, isLoading, isError } = useSkillsByTag(tag);

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
        <AllSkills initialData={initialData} />
      </TabPanel>

      <TabPanel id={tag}>
        {isLoading || isFetching ? (
          <Loading />
        ) : isError || !skills ? (
          <Error refetch={refetch} />
        ) : (
          <SkillsList skills={skills} />
        )}
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
