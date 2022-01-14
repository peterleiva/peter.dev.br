import { model, ObjectId, Schema, Types } from 'mongoose';
import Education from './education';
import Job from './job';
import Skill from './skill';

export interface Contact {
  link: string;
  name: string;
  username: string;
}

export interface Resume {
  bio?: string;
  contacts: Contact[];
  educations: ObjectId[];
  courses: ObjectId[];
  jobs: ObjectId[];
  skills: ObjectId[];
}

const contactSchema = new Schema<Contact>({
  link: {
    type: String,
    required: true,
  },

  name: {
    type: String,
    required: true,
  },

  username: {
    type: String,
    required: true,
  },
});

const resumeSchema = new Schema<Resume>({
  bio: String,

  contacts: [
    {
      required: true,
      type: contactSchema,
    },
  ],

  educations: {
    required: true,
    type: [
      {
        type: Types.ObjectId,
        ref: Education,
      },
    ],
  },

  courses: {
    required: true,
    type: [
      {
        type: Types.ObjectId,
        ref: Education,
      },
    ],
  },

  jobs: {
    required: true,
    type: [
      {
        type: Types.ObjectId,
        ref: Job,
      },
    ],
  },

  skills: {
    required: true,

    type: [
      {
        type: Types.ObjectId,
        ref: Skill,
      },
    ],
  },
});

export default model('Resume', resumeSchema);
