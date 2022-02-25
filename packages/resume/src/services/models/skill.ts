import { HydratedDocument, models, model, Schema, Model } from 'mongoose';

export interface Tag {
  name: string;
}

export interface Skill {
  name: string;
  name_pt?: string;
  tags: Tag[];
}

interface Translatable {
  translate(locale?: string): Skill;
}

export type SkillDocument = HydratedDocument<Skill, Translatable>;

const skillSchema = new Schema<Skill, SkillModel>({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 2,
    maxlength: 255,
  },

  name_pt: {
    type: String,
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

skillSchema.method<SkillDocument>(
  'translate',
  function (locale?: string): Skill {
    const translated = this.toObject<Skill>();
    translated.name = this.get(`name_${locale}`) ?? translated.name;

    return translated;
  }
);

type SkillModel = Model<Skill, Record<string, unknown>, Translatable>;

export default (models.Skill as SkillModel) ??
  model<Skill>('Skill', skillSchema);
