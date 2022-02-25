import * as R from 'ramda';
import type { Job } from 'types';
import { toDateTime, optionalToDateTime } from 'lib';
import { skillConvert } from './skills';
import type { ResumeDocument } from './models/resume';
import type { JobDocument } from './models/job';
import type { SkillDocument } from './models/skill';

type PopulatedJob = Omit<JobDocument, 'techs'> & {
  techs: SkillDocument[];
};

const jobPicker = R.pick([
  'position',
  'activity',
  'description',
  'company',
  'techs',
]);

const companyPicker = R.pick(['name', 'alias']);

export default async function getJobs(resume: ResumeDocument): Promise<Job[]> {
  const { jobs } = await resume.populate<{ jobs: PopulatedJob[] }>({
    path: 'jobs',
    populate: {
      path: 'techs',
    },
  });

  return R.map<PopulatedJob, Job>(
    R.pipe(
      R.evolve({
        company: companyPicker,
        techs: skillConvert,
        activity: {
          start: toDateTime,
          end: optionalToDateTime,
        },
      }),
      R.evolve({
        activity: R.pick(['start', 'end']),
      }),
      jobPicker
    )
  )(jobs);
}
