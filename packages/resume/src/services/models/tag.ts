import { Schema, HydratedDocument, models, model, type Model } from 'mongoose';
import { Translatable, translatePlugin } from './plugins';

export interface Tag {
  name: string;
}

const schema = new Schema<Tag, TagModel, Translatable<Tag>>({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 144,
    lowercase: true,
    index: true,
  },
});

schema.plugin(translatePlugin, { paths: ['name'] });

export type TagDocument = HydratedDocument<Tag, Translatable<Tag>>;

export type TagModel = Model<Tag, Record<string, never>, Translatable<Tag>>;

export default models.Tag ?? model<Tag>('Tag', schema);
