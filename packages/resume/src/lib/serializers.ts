import * as R from 'ramda';
import { Resume, Job, Education, Courses, Contact } from 'types';
import { optional, toISO, fromISO } from './serialization-utils';

type SerializedJob = Omit<Job, 'activity'> & {
  activity: { start: string; end?: string };
};

export const jobSerializer = R.map<Job, SerializedJob>(
  R.evolve({
    activity: {
      start: toISO,
      end: optional(toISO),
    },
  })
);

export const jobDeserializer = R.map<SerializedJob, Job>(
  R.evolve({
    activity: {
      start: fromISO,
      end: optional(fromISO),
    },
  })
);

type SerializedEducation = Omit<Education, 'started' | 'ended'> & {
  started: string;
  ended?: string;
};
const periodSerializer = R.evolve({
  started: toISO,
  ended: optional(toISO),
});

export const educationSerializer = R.map<Education, SerializedEducation>(
  periodSerializer
);

export const educationDeserializer = R.map<SerializedEducation, Education>(
  R.evolve({
    started: fromISO,
    ended: optional(fromISO),
  })
);

type SerializedCourse = Omit<SerializedEducation, 'institution'>;
type SerializedCourses = {
  institution: string;
  courses: SerializedCourse[];
};

export const courseSerializer = R.map<Courses, SerializedCourses>(
  R.evolve({
    courses: R.map<Omit<Education, 'institution'>, SerializedCourse>(
      periodSerializer
    ),
  })
);

export type SerializedResume = Omit<
  Resume,
  'jobs' | 'educations' | 'courses'
> & {
  jobs: SerializedJob[];
  educations: SerializedEducation[];
  courses: SerializedCourses[];
};

const contactsSerializer = R.map(
  R.compose<[Contact], Contact, Contact>(
    R.pick(['link', 'name', 'username', 'icon']),
    R.evolve({
      icon: (icon: Contact['icon']) => (icon?.name ? { ...icon } : {}),
    })
  )
);

export const resumeSerializer = R.evolve({
  contacts: contactsSerializer,
  jobs: jobSerializer,
  educations: educationSerializer,
  courses: courseSerializer,
});
