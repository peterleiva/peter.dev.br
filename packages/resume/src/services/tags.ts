import * as R from 'ramda';
import type { Tag } from 'types';
import SkillModel from './models/skill';

type TagAggregate = { _id: string };

export const allTags = async (): Promise<Tag[]> => {
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
