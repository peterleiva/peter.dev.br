import EducationModel from 'models/education';
import type { Courses } from 'types';
import { ResumeDocument } from 'models/resume';
import type { EducationReturn } from './get-educations';

type CoursesReturn = Omit<Courses, 'courses'> & {
  courses: EducationReturn[];
};
export const getCourses = async (
  resume: ResumeDocument
): Promise<CoursesReturn[]> => {
  const courses = await EducationModel.aggregate<CoursesReturn>([
    {
      $match: {
        _id: { $in: resume.courses },
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
      $group: {
        _id: '$institution.name',
        courses: {
          $push: {
            title: '$title',
            description: '$description',
            started: {
              $dateToString: { date: '$started' },
            },
            ended: {
              $dateToString: { date: '$ended' },
            },
          },
        },
      },
    },
    {
      $project: {
        _id: 0,
        institution: '$_id',
        courses: 1,
      },
    },
  ]).exec();

  return courses;
};
