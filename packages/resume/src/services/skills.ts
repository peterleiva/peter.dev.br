import { Skill, Tag as ITag } from 'types';
import * as R from 'ramda';
import { ResumeDocument } from './models/resume';
import SkillModel, { SkillDocument, Tag } from './models/skill';
import { Translations } from './models';

const attrs = <T extends Translations>(translatable: T, locale: string) =>
  Object.keys(translatable?.translations?.[locale.toLowerCase()] ?? {});

function translate(
  obj: Translations,
  locale: string
): { [attr: string]: TranslationEntry } {
  return attrs(obj, locale).reduce((attrs, attr) => {
    const translation = obj.translations?.[locale]?.[attr];
    console.log('attrs', translation);

    return R.mergeRight(attrs, { [attr]: translation ?? obj[attr] });
  }, {});
}
export const skillMapper = (skills: SkillDocument[]): Skill[] => {
  const tagsLens = R.lensProp<Tag>('name');
  const tagView = R.view<Tag, string>(tagsLens);
  const transform = R.evolve({ tags: R.map(tagView) });

  const translator = (skill: SkillDocument) =>
    R.mergeRight(skill, translate(skill, 'pt'));

  return R.map<SkillDocument, Skill>(
    R.pipe(transform, translator, R.pick(['name', 'tags']))
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
    {
      $sort: { _id: 1 },
    },
  ]).exec();

  const idProp = R.lensProp<TagAggregate>('_id');
  return R.map(R.view(idProp))(tags);
};

export const byTag = async (tag: ITag): Promise<Skill[]> => {
  const skills = await SkillModel.find({ 'tags.name': tag });

  return skillMapper(skills);
};
