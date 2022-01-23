import { HydratedDocument, models, model, Schema, Model } from 'mongoose';

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
        minlength: 3,
        maxlength: 144,
        lowercase: true,
      },
    }),
  ],
});

type SkillModel = Model<Skill>;

export default (models.Skill as SkillModel) ??
  model<Skill>('Skill', skillSchema);
