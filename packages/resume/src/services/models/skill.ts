import { HydratedDocument, models, model, Schema, Model } from 'mongoose';
import { translatePlugin, type Translatable } from './plugins';

export interface Tag {
  name: string;
}

export interface Skill {
  name: string;
  name_pt?: string;
  tags: Tag[];
}

export type SkillDocument = HydratedDocument<Skill, Translatable<Skill>>;

const skillSchema = new Schema<Skill, SkillModel, Translatable<Skill>>({
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

skillSchema.plugin(translatePlugin, { paths: ['name'] });

type SkillModel = Model<Skill, Record<string, unknown>, Translatable<Skill>>;

export default (models.Skill as SkillModel) ??
  model<Skill>('Skill', skillSchema);
