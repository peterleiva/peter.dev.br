import { HydratedDocument, models, model, Schema, Model } from 'mongoose';
import { plugins, Translate, Translations } from './plugins';

export interface Tag {
  name: string;
}

export interface Skill extends Translations {
  name: string;
  tags: Tag[];
}

export type SkillDocument = HydratedDocument<Skill, Translate>;

type SkillModel = Model<Skill, Record<string, unknown>, Translate>;

const skillSchema = new Schema<Skill, SkillModel, Translate>({
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
}).plugin(plugins.translations, ['name']);

export default (models.Skill as SkillModel) ??
  model<Skill>('Skill', skillSchema);
