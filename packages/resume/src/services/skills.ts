import type { Skill } from 'types';
import * as R from 'ramda';
import { type ResumeDocument } from './models/resume';
import SkillModel, {
  type SkillDocument,
  type Skill as ISkill,
} from './models/skill';
import TagModel from './models/tag';
import { i18n } from 'next-i18next';

const tagConvert = R.evolve({ tags: R.map(R.pick(['id', 'name'])) });

export const skillConvert = (skills: SkillDocument[]): Skill[] => {
  return R.map(
    R.compose<[ISkill], ISkill, Skill>(R.pick(['name', 'tags']), tagConvert)
  )(translate(skills));
};

const translate = (skills: SkillDocument[]) =>
  skills.map(skill => skill.translate(i18n?.language));

export const getSkills = async (resume: ResumeDocument): Promise<Skill[]> => {
  const { skills } = await resume.populate<{ skills: SkillDocument[] }>(
    'skills'
  );

  return skillConvert(skills);
};

export const getByTagName = async (tag: string): Promise<Skill[]> => {
  const tags = await TagModel.find({ name: tag });
  const skills = await SkillModel.find({ tags: tags });

  return skillConvert(skills);
};

export const getByTagId = async (tagId: string): Promise<Skill[]> => {
  const skills = await SkillModel.find({ tags: tagId });

  return skillConvert(skills);
};
