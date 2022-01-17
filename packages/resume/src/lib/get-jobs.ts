import * as R from 'ramda';
import type { Job } from 'types';
import { ResumeDocument } from 'models/resume';
import JobModel from 'models/job';
import { skillMapper } from './get-skills';
import { DateTime } from 'luxon';
import { SkillDocument } from 'src/models/skill';

type AggregateJob = Omit<Job, 'activity' | 'skills'> & {
  activity: { start: Date; end?: Date };
  skills: SkillDocument[];
};

export const getJobs = async (resume: ResumeDocument): Promise<Job[]> => {
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

  return R.map(
    R.evolve({
      techs: skillMapper,
      activity: {
        start: DateTime.fromJSDate,
        end: DateTime.fromJSDate,
      },
    })
  )(jobs);
};
