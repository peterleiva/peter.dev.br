import EducationModel, { Education } from 'models/education';
import type { Courses } from 'types';
import { ResumeDocument } from 'models/resume';
import * as R from 'ramda';
import { optional, toDateTime } from 'lib/serialization-utils';

type CourseAggregation = Omit<Education, 'institution'>;

type CoursesAggregation = {
  institution: string;
  courses: CourseAggregation[];
};

export const getCourses = async (
  resume: ResumeDocument
): Promise<Courses[]> => {
  const courses = await EducationModel.aggregate<CoursesAggregation>([
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
            started: '$started',
            ended: '$ended',
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

  return R.map<CoursesAggregation, Courses>(
    R.evolve({
      courses: R.map(
        R.evolve({
          started: toDateTime,
          ended: optional(toDateTime),
        })
      ),
    })
  )(courses);
};
