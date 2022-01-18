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
import { LibIcon } from 'lib/icon-loader';

interface Icon {
  lib: LibIcon;
  name: string;
}

export interface Contact {
  link: string;
  name: string;
  username: string;
  icon: Partial<Icon>;
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

  icon: {
    lib: String,
    name: String,
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
