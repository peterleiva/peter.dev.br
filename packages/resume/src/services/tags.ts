import type { Tag } from 'types';
import TagModel, { type TagDocument } from './models/tag';
import * as R from 'ramda';
import locale from './locale';

const translate = (tag: TagDocument) => tag.translate(locale.getLocale());

export const convertTag = (tag: TagDocument): Tag => ({
  id: tag.id,
  ...R.pick(['name'])(translate(tag)),
});

export const allTags = async (): Promise<Tag[]> => {
  const tags: TagDocument[] = await TagModel.find({}).exec();

  return tags.map(convertTag);
};
