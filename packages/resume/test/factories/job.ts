import casual from 'casual';
import { Factory } from 'fishery';
import JobModel, { Job, JobDocument } from 'services/models/job';
import { period } from './period';

export default Factory.define<Job, null, JobDocument>(({ onCreate }) => {
  onCreate(async job => JobModel.create(job));

  return {
    position: casual.title,
    description: casual.description,
    company: {
      name: casual.company_name,
      alias: casual.word,
    },

    activity: { ...period() },

    techs: [],
  };
});
