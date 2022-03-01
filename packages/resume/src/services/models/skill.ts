import {
  HydratedDocument,
  models,
  model,
  Schema,
  Model,
  Types,
} from 'mongoose';
import { translatePlugin, type Translatable } from './plugins';
import TagModel, { type Tag } from './tag';
import autopopulate from 'mongoose-autopopulate';

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
    {
      type: Types.ObjectId,
      ref: TagModel,
      autopopulate: true,
    },
  ],
});

skillSchema.plugin(translatePlugin, { paths: ['name'] });
skillSchema.plugin(autopopulate);

type SkillModel = Model<Skill, Record<string, unknown>, Translatable<Skill>>;

export default (models.Skill as SkillModel) ??
  model<Skill>('Skill', skillSchema);
