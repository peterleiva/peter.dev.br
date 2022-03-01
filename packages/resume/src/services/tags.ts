import * as R from 'ramda';
import type { Tag } from 'types';
import TagModel, { type TagDocument } from './models/tag';

export const allTags = async (): Promise<Tag[]> => {
  const tags: TagDocument[] = await TagModel.find({}).exec();

  return R.map(R.pick(['id', 'name']))(tags);
};
