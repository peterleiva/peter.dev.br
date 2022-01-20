import * as R from 'ramda';
import { Resume, Contact } from 'types';
import { SerializedCourses } from './course';
import {
  serialize as educationSerializer,
  SerializedEducation,
} from './education';
import { serialize as courseSerializer } from './course';
import { SerializedJob, serialize as jobSerializer } from './job';

export type SerializedResume = Omit<
  Resume,
  'jobs' | 'educations' | 'courses' | 'bio'
> & {
  bio?: string | null;
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

export const serialize: (resume: Resume) => SerializedResume = R.evolve({
  bio: (bio?: string) => bio ?? null,
  contacts: contactsSerializer,
  jobs: jobSerializer,
  educations: educationSerializer,
  courses: courseSerializer,
});
