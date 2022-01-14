import { model, Schema } from 'mongoose';

export interface Education {
  title: string;
  description?: string;
  started: Date;
  ended?: Date;

  institution: {
    name: string;
  };
}

const educationSchema = new Schema<Education>({
  title: {
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

export default model('Education', educationSchema);
