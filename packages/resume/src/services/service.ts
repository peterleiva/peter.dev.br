import { connect, disconnect } from 'lib/database';
import * as R from 'ramda';
import type { Resume } from 'types';
import ResumeModel, { Contact } from './models/resume';
import getCourses from './get-courses';
import getEducations from './get-educations';
import getJobs from './get-jobs';
import { getSkills } from './get-skills';

export default async function getResume(): Promise<Resume | null> {
  const db = await connect();

  const resume = await ResumeModel.findOne();

  if (!resume) {
    await disconnect(db);
    return null;
  }

  const [skills, educations, jobs, courses] = await Promise.all([
    getSkills(resume),
    getEducations(resume),
    getJobs(resume),
    getCourses(resume),
  ]);

  await disconnect(db);

  const { bio, contacts } = R.evolve({
    contacts: R.map<
      Contact,
      Pick<Contact, 'link' | 'name' | 'username' | 'icon'>
    >(
      R.compose<
        [Contact],
        Contact,
        Pick<Contact, 'link' | 'name' | 'username' | 'icon'>
      >(
        R.pick(['link', 'name', 'username', 'icon']),
        R.evolve({
          icon: icon => (icon?.name ? { ...icon } : {}),
        })
      )
    ),
  })(resume);

  return {
    bio,
    contacts,
    jobs,
    skills,
    educations,
    courses,
  };
}
