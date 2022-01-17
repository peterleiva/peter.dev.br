import {
  HydratedDocument,
  models,
  model,
  ObjectId,
  Schema,
  Types,
} from 'mongoose';
import SkillModel from './skill';
import EducationModel from './education';
import JobModel from './job';

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

export type ResumeDocument = HydratedDocument<Resume>;

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
        ref: EducationModel,
      },
    ],
  },

  courses: {
    required: true,
    type: [
      {
        type: Types.ObjectId,
        ref: EducationModel,
      },
    ],
  },

  jobs: {
    required: true,

    type: [
      {
        type: Types.ObjectId,
        ref: JobModel,
      },
    ],
  },

  skills: {
    required: true,

    type: [
      {
        type: Types.ObjectId,
        ref: SkillModel,
      },
    ],
  },
});

export default models.Resume ?? model('Resume', resumeSchema);
