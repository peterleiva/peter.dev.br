import EducationModel from 'models/education';
import { ResumeDocument } from 'models/resume';
import type { Education } from 'types';

export type EducationReturn = Omit<Education, 'started' | 'ended'> & {
  started: string;
  ended?: string;
};

export const getEducations = async (
  resume: ResumeDocument
): Promise<EducationReturn[]> => {
  return await EducationModel.aggregate<EducationReturn>([
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
        started: {
          $dateToString: { date: '$started' },
        },
        ended: {
          $dateToString: { date: '$ended' },
        },
      },
    },
  ]).exec();
};
