import type { Course, Courses } from 'types';
import * as R from 'ramda';
import { optionalToDateTime, toDateTime } from 'lib';
import { Education, ResumeDocument, EducationModel } from './models';

type CourseAggregation = Omit<Education, 'institution'>;

type CoursesAggregation = {
  institution: string;
  courses: CourseAggregation[];
};

export default async function getCourses(
  resume: ResumeDocument
): Promise<Courses[]> {
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

  const period = R.evolve({
    started: toDateTime,
    ended: optionalToDateTime,
  });

  return R.map<CoursesAggregation, Courses>(
    R.evolve({
      courses: R.map<CourseAggregation, Course>(period),
    })
  )(courses);
}
