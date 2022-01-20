import * as R from 'ramda';
import type { Job } from 'types';
import { optional, toDateTime } from 'lib/serialization-utils';
import { skillMapper } from './get-skills';
import { ResumeDocument } from './models/resume';
import JobModel from './models/job';
import { SkillDocument } from './models/skill';

type AggregateJob = Omit<Job, 'activity' | 'techs'> & {
  activity: { start: Date; end?: Date };
  techs: SkillDocument[];
};

export default async function getJobs(resume: ResumeDocument): Promise<Job[]> {
  const jobs = await JobModel.aggregate<AggregateJob>([
    {
      $match: {
        _id: { $in: resume.jobs },
      },
    },
    {
      $sort: {
        'activity.start': -1,
        'activity.end': -1,
        'company.name': 1,
      },
    },
    {
      $lookup: {
        from: 'skills',
        localField: 'techs',
        foreignField: '_id',
        as: 'techs',
      },
    },
    {
      $project: {
        _id: 0,
        activity: {
          start: '$activity.start',
          end: '$activity.end',
        },
        company: {
          name: '$company.name',
          alias: '$company.alias',
        },
        position: 1,
        description: 1,
        techs: 1,
      },
    },
  ]).exec();

  return R.map<AggregateJob, Job>(
    R.evolve({
      techs: skillMapper,
      activity: {
        start: toDateTime,
        end: optional(toDateTime),
      },
    })
  )(jobs);
}
