import { map, evolve } from 'ramda';
import type { Education, Courses } from 'types';
import { fromISO, optional, toISO } from '../utils';
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

export const deserialize = map<SerializedCourses, Courses>(
  evolve({
    courses: map<SerializedCourse, Omit<Education, 'institution'>>(
      evolve({
        started: fromISO,
        ended: optional(fromISO),
      })
    ),
  })
);
