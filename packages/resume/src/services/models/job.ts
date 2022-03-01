import {
  HydratedDocument,
  models,
  model,
  ObjectId,
  Schema,
  Types,
  Model,
} from 'mongoose';

import { Translatable, translatePlugin } from './plugins';

export interface Job {
  position: string;
  description?: string;
  company: Company;

  activity: {
    start: Date;
    end?: Date;
  };

  techs: ObjectId[];
}

interface Company {
  name: string;
  alias?: string;
}

const jobSchema = new Schema<Job, JobModel, Translatable<Job>>({
  position: {
    type: String,
    required: true,
  },

  description: String,

  company: {
    required: true,
    type: new Schema<Company>({
      name: {
        type: String,
        unique: true,
        minlength: 3,
        required: true,
      },

      alias: String,
    }),
  },

  activity: {
    start: {
      type: Date,
      required: true,
    },

    end: Date,
  },

  techs: [{ type: Types.ObjectId, ref: 'Skill' }],
});

jobSchema.plugin(translatePlugin, { paths: ['position', 'description'] });

export type JobDocument = HydratedDocument<Job, Translatable<Job>>;

export type JobModel = Model<Job, Record<string, never>, Translatable<Job>>;

export default (models.Job as JobModel) ?? model('Job', jobSchema);
