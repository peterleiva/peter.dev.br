import * as R from 'ramda';
import type { Resume, Tag } from 'types';
import { connect, disconnect } from './database';
import ResumeModel, { Contact, ResumeDocument } from './models/resume';
import getCourses from './get-courses';
import getEducations from './get-educations';
import getJobs from './get-jobs';
import { allTags, getSkills, byTag } from './skills';

const dbWrapper = async <T>(fn: () => Promise<T>) => {
  const db = await connect();
  const result = await fn();
  await disconnect(db);

  return result;
};

const findResume = (): Promise<ResumeDocument | null> =>
  ResumeModel.findOne().exec();

export async function getResume(): Promise<Resume | null> {
  const db = await connect();

  const resume = await findResume();

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

  const { bio, contacts, jobTitle, name } = R.evolve({
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
          icon: (icon: Contact['icon']) => (icon?.name ? { ...icon } : {}),
        })
      )
    ),
  })(resume);

  return {
    name,
    jobTitle,
    bio,
    contacts,
    jobs,
    skills,
    educations,
    courses,
  };
}

export const getSkillsByTag = (tag: Tag) => dbWrapper(() => byTag(tag));

export const getAllTags = async () => dbWrapper(allTags);
