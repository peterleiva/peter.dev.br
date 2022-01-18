import { connect, disconnect } from 'lib/database';
import { getCourses } from './get-courses';
import { getEducations } from './get-educations';
import { getJobs } from './get-jobs';
import { getResume } from './get-resume';
import { getSkills } from './get-skills';
import * as R from 'ramda';
import { Contact } from 'models/resume';
import { courseSerializer, educationSerializer, jobSerializer } from 'lib';

export async function getAllResume() {
  const db = await connect();

  const resume = await getResume();

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

  await disconnect(db);

  return {
    bio,
    contacts,
    jobs: jobSerializer(jobs),
    skills,
    educations: educationSerializer(educations),
    courses: courseSerializer(courses),
  };
}
