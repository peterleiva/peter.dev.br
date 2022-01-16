import { model, ObjectId, Schema, Types } from 'mongoose';

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

const JobSchema = new Schema<Job>({
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

export default model('Job', JobSchema);
