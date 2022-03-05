import { useState } from 'react';
import { pick } from 'ramda';
import { Skill, Tag as ITag } from 'types';
import Tag from './Tag';
import { Tabs } from '../tabs';
import SkillsList from './SkillsList';
import { useAllSkills, useSkillsByTag, useTags } from './hooks';
import { useTranslation } from 'next-i18next';

type SkillsProps = {
  skills: Skill[];
};

const getStates = pick(['isLoading', 'isFetching', 'isError', 'refetch']);

export default function Skills({ skills: initialData }: SkillsProps) {
  const { tags, isLoading: isLoadingTags } = useTags();
  const [tag, setTag] = useState<ITag | undefined>();
  const skillsByTag = useSkillsByTag(tag);
  const allSkills = useAllSkills(initialData);
  const { t } = useTranslation();

  return (
    <Tabs defaultValue="All">
      <section className="print:hidden flex flex-row flex-wrap mb-5">
        <Tabs.Tab id="All">
          <Tag tag={{ id: 'All', name: t('all') }} />
        </Tabs.Tab>

        {tags?.map(tag => (
          <Tabs.Tab key={tag.id} id={tag.id} onSelect={() => setTag(tag)}>
            <Tag tag={tag} />
          </Tabs.Tab>
        ))}

        {isLoadingTags && <span>&#8411;</span>}
      </section>

      <Tabs.Panel id="All">
        <SkillsList
          skills={allSkills.skills}
          {...getStates({ ...allSkills })}
        />
      </Tabs.Panel>

      <Tabs.Panel id={tag?.id}>
        <SkillsList
          skills={skillsByTag.skills}
          {...getStates({ ...skillsByTag })}
        />
      </Tabs.Panel>
    </Tabs>
  );
}
