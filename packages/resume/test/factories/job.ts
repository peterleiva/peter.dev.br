import casual from 'casual';
import { Factory } from 'fishery';
import JobModel, { Job } from 'models/job';
import { period } from './period';

export default Factory.define<Job>(({ onCreate }) => {
  onCreate(JobModel.create);

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
