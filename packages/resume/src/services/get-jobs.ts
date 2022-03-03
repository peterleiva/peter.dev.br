import * as R from 'ramda';
import type { Job } from 'types';
import { toDateTime, optionalToDateTime } from 'lib';
import { skillConvert } from './skills';
import type { ResumeDocument } from './models/resume';
import type { JobDocument } from './models/job';
import type { SkillDocument } from './models/skill';
import locale from './locale';

type PopulatedJob = Omit<JobDocument, 'techs'> & {
  techs: SkillDocument[];
};

const companyPicker = R.pick(['name', 'alias']);

const translate = (job: PopulatedJob) => job.translate(locale.getLocale());

export default async function getJobs(resume: ResumeDocument): Promise<Job[]> {
  const { jobs } = await resume.populate<{ jobs: PopulatedJob[] }>({
    path: 'jobs',
    populate: {
      path: 'techs',
    },
  });

  return jobs.map((job: PopulatedJob) => {
    const {
      activity: { start, end },
      company,
      techs,
    } = job;

    return {
      ...R.pick(['description', 'position'], translate(job)),
      company: companyPicker(company),
      activity: {
        start: toDateTime(start),
        end: optionalToDateTime(end),
      },
      techs: skillConvert(techs),
    };
  });
}
