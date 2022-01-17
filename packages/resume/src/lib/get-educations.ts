import EducationModel from 'models/education';
import { ResumeDocument } from 'models/resume';
import type { Education } from 'types';
import { toDateTime, optional } from './serialization-utils';
import { evolve, map } from 'ramda';

type EducationAggregation = Omit<Education, 'started' | 'ended'> & {
  started: Date;
  ended?: Date;
};

export const getEducations = async (
  resume: ResumeDocument
): Promise<Education[]> => {
  const educations = await EducationModel.aggregate<EducationAggregation>([
    {
      $match: {
        _id: { $in: resume.educations },
      },
    },
    {
      $sort: {
        started: -1,
        ended: -1,
        title: 1,
      },
    },
    {
      $project: {
        _id: 0,
        title: 1,
        institution: {
          name: '$institution.name',
        },
        description: 1,
        started: 1,
        ended: 1,
      },
    },
  ]).exec();

  return map(
    evolve({
      started: toDateTime,
      ended: optional(toDateTime),
    })
  )(educations);
};
