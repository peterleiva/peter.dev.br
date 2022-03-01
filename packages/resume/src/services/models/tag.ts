import { Schema, HydratedDocument, models, model } from 'mongoose';

export interface Tag {
  name: string;
}

const schema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 144,
    lowercase: true,
  },
});

export type TagDocument = HydratedDocument<Tag>;

export default models.Tag ?? model<Tag>('Tag', schema);
