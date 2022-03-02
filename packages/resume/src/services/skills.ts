import type { Skill } from 'types';
import * as R from 'ramda';
import { type ResumeDocument } from './models/resume';
import SkillModel, { type SkillDocument } from './models/skill';
import TagModel, { type TagDocument } from './models/tag';
import { i18n } from 'next-i18next';
import { convertTag } from './tags';

export const skillConvert = (skills: SkillDocument[]): Skill[] => {
  return skills.map(skill => {
    return {
      ...R.pick(['name'], translate(skill)),
      tags: skill.tags.map(tag => convertTag(tag as TagDocument)),
    };
  });
};

const translate = (skill: SkillDocument) => skill.translate(i18n?.language);

export const getSkills = async (resume: ResumeDocument): Promise<Skill[]> => {
  const { skills } = await resume.populate<{ skills: SkillDocument[] }>(
    'skills'
  );

  if (!skills) return [];

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
