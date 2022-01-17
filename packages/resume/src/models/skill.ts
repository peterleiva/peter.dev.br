import { HydratedDocument, model, Schema } from 'mongoose';

export interface Tag {
  name: string;
}

export interface Skill {
  name: string;
  tags: Tag[];
}

export type SkillDocument = HydratedDocument<Skill>;

const skillSchema = new Schema<Skill>({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 2,
    maxlength: 255,
  },

  tags: [
    new Schema<Tag>({
      name: {
        type: String,
        required: true,
        minlength: 2,
      },
    }),
  ],
});

export default model('Skill', skillSchema);
