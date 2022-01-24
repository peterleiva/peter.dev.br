import * as R from 'ramda';
import type { Resume, Tag } from 'types';
import { connect } from './database';
import ResumeModel, { Contact, ResumeDocument } from './models/resume';
import getCourses from './get-courses';
import getEducations from './get-educations';
import getJobs from './get-jobs';
import { allTags, getSkills, byTag } from './skills';

const dbWrapper = async <T>(fn: () => Promise<T>) => {
  await connect();
  return fn();
};

const findResume = (): Promise<ResumeDocument | null> =>
  ResumeModel.findOne().exec();

export const getResume = (): Promise<Resume | null> =>
  dbWrapper(async () => {
    const resume = await findResume();

    if (!resume) {
      return null;
    }

    const [skills, educations, jobs, courses] = await Promise.all([
      getSkills(resume),
      getEducations(resume),
      getJobs(resume),
      getCourses(resume),
    ]);

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
  });

export const getSkillsByTag = (tag: Tag) => dbWrapper(() => byTag(tag));

export const getAllTags = () => dbWrapper(allTags);

export const getAllSkills = async () =>
  dbWrapper(async () => {
    const resume = await findResume();

    if (!resume) return [];

    return getSkills(resume);
  });
