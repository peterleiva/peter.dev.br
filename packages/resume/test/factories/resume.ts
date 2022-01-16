import casual from 'casual';
import { Factory } from 'fishery';
import ResumeModel, { Resume, ResumeDocument } from 'models/resume';
import JobModel from 'models/job';
import SkillModel from 'models/skill';
import { times } from 'ramda';
import skillsFactory from './skill';
import jobsFactory from './job';

const contact = times(() => ({
  link: casual.url,
  name: casual.name,
  username: casual.username,
}));

interface TransientParams {
  jobs: number;
  skills: number;
}

export default Factory.define<Resume, TransientParams, ResumeDocument>(
  ({
    onCreate,
    transientParams: { jobs = 0, skills = 0 },
    associations: { educations = [], courses = [] },
  }) => {
    onCreate(async resume => {
      const { jobs, skills } = resume;
      return await ResumeModel.create({
        ...resume,
        jobs: await JobModel.create(jobs),
        skills: await SkillModel.create(skills),
      });
    });

    return {
      bio: casual.description,
      contacts: contact(2),
      educations,
      courses,
      jobs: jobsFactory.buildList(jobs),
      skills: skillsFactory.buildList(skills),
    };
  }
);
