import { HydratedDocument, model, Schema, models } from 'mongoose';

export interface Education {
  title: string;
  description?: string;
  started: Date;
  ended?: Date;

  institution: {
    name: string;
  };
}

export type EducationDocument = HydratedDocument<Education>;

const educationSchema = new Schema<Education>({
  title: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
  },

  institution: {
    required: true,

    type: new Schema({
      name: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
      },
    }),
  },

  description: String,

  started: {
    type: Date,
    required: true,
  },

  ended: Date,
});

export default models.Education ?? model('Education', educationSchema);
