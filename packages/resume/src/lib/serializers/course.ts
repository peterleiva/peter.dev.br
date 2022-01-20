import { map, evolve } from 'ramda';
import type { Education, Courses } from 'types';
import { optional, toISO } from '../utils';
import { SerializedEducation } from './education';

const periodSerializer = evolve({
  started: toISO,
  ended: optional(toISO),
});

export type SerializedCourse = Omit<SerializedEducation, 'institution'>;
export type SerializedCourses = {
  institution: string;
  courses: SerializedCourse[];
};

export const serialize = map<Courses, SerializedCourses>(
  evolve({
    courses: map<Omit<Education, 'institution'>, SerializedCourse>(
      periodSerializer
    ),
  })
);
