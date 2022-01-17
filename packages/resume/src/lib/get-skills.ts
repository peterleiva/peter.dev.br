import { ResumeDocument } from 'models/resume';
import { SkillDocument, Tag } from 'models/skill';
import { Skill } from 'types';
import * as R from 'ramda';

export const skillMapper = (skills: SkillDocument[]) => {
  const tagsLens = R.lensProp<Tag>('name');
  const tagView = R.view<Tag, string>(tagsLens);
  const transform = R.evolve({ tags: R.map(tagView) });

  return R.map(
    R.compose<
      [SkillDocument],
      Omit<SkillDocument, 'tags'> & { tags: string[] },
      Skill
    >(R.pick(['name', 'tags']), transform)
  )(skills);
};

export const getSkills = async (resume: ResumeDocument): Promise<Skill[]> => {
  const { skills } = await resume.populate<{ skills: SkillDocument[] }>(
    'skills'
  );

  return skillMapper(skills);
};
