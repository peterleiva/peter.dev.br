import { evolve, map } from 'ramda';
import type { Education } from 'types';
import { toDateTime, optionalToDateTime } from 'lib';
import { ResumeDocument, EducationModel } from './models';

type EducationAggregation = Omit<Education, 'started' | 'ended'> & {
  started: Date;
  ended?: Date;
};

export default async function getEducations(
  resume: ResumeDocument
): Promise<Education[]> {
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
      ended: optionalToDateTime,
    })
  )(educations);
}
