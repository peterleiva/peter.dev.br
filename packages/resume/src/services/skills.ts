import { Skill, Tag as ITag } from 'types';
import * as R from 'ramda';
import { ResumeDocument } from './models/resume';
import SkillModel, { SkillDocument, Tag } from './models/skill';

export const skillMapper = (skills: SkillDocument[]): Skill[] => {
  const tagsLens = R.lensProp<Tag>('name');
  const tagView = R.view<Tag, string>(tagsLens);
  const transform = R.evolve({ tags: R.map(tagView) });

  return R.map<SkillDocument, Skill>(
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

type TagAggregate = { _id: string };
export const allTags = async (): Promise<ITag[]> => {
  const tags = await SkillModel.aggregate<TagAggregate>([
    {
      $unwind: {
        path: '$tags',
      },
    },
    {
      $group: {
        _id: '$tags.name',
      },
    },
  ]).exec();

  const idProp = R.lensProp<TagAggregate>('_id');
  return R.map(R.view(idProp))(tags);
};

export const byTag = async (tag: ITag): Promise<Skill[]> => {
  const skills = await SkillModel.find({ 'tags.name': tag });

  return skillMapper(skills);
};
