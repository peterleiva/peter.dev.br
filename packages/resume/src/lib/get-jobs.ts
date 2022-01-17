import type { Job } from 'types';
import { ResumeDocument } from 'models/resume';
import JobModel from 'models/job';
import * as R from 'ramda';
import { DateTime } from 'luxon';
import { skillMapper } from './get-skills';

type AggregateJob = Omit<Job, 'activity'> & {
  activity: { start: Date; end?: Date };
};
export const getJobs = async (resume: ResumeDocument): Promise<Job[]> => {
  const toDate = (date: Date) => DateTime.fromJSDate(date);

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
        start: toDate,
        end: date => (date ? toDate(date) : undefined),
      },
    })
  )(jobs);
};
