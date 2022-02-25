import type { Skill, Tag as ITag } from 'types';
import * as R from 'ramda';
import { type ResumeDocument } from './models/resume';
import SkillModel, {
  type SkillDocument,
  type Tag,
  type Skill as ISkill,
} from './models/skill';
import { i18n } from 'next-i18next';

export const skillMapper = (skills: ISkill[]): Skill[] => {
  const tagsLens = R.lensProp<Tag>('name');
  const tagView = R.view<Tag, string>(tagsLens);
  const transform = R.evolve({ tags: R.map(tagView) });

  return R.map<ISkill, Skill>(
    R.compose<[ISkill], Omit<ISkill, 'tags'> & { tags: string[] }, Skill>(
      R.pick(['name', 'tags']),
      transform
    )
  )(skills);
};

export const getSkills = async (resume: ResumeDocument): Promise<Skill[]> => {
  const { skills } = await resume.populate<{ skills: SkillDocument[] }>(
    'skills'
  );

  return skillMapper(
    skills.map((skill: SkillDocument) => skill.translate(i18n?.language))
  );
};

export const byTag = async (tag: ITag): Promise<Skill[]> => {
  const skills = await SkillModel.find({ 'tags.name': tag });

  return skillMapper(skills.map(skill => skill.translate(i18n?.language)));
};
