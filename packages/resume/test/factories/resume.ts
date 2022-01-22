import casual from 'casual';
import { Types } from 'mongoose';
import { Factory } from 'fishery';
import ResumeModel, { Resume, ResumeDocument } from 'services/models/resume';
import * as R from 'ramda';
import skillsFactory from './skill';
import jobsFactory from './job';
import educationFactory from './education';
import contact from './contact';

interface TransientParams {
  jobsQuantity: number;
  skillsQuantity: number;
}

export default Factory.define<Resume, TransientParams, ResumeDocument>(
  ({
    onCreate,
    transientParams: { jobsQuantity = 3, skillsQuantity = 3 },
    associations: { educations = [], courses = [], jobs = [], skills = [] },
  }) => {
    onCreate(async (resume: Resume) => {
      const idView = R.view(R.lensProp<{ _id: Types.ObjectId }>('_id'));
      const idMap = R.map<{ _id: Types.ObjectId }, Types.ObjectId>(idView);

      const jobsDocs = await jobsFactory.createList(jobsQuantity);
      const skillsDocs = await skillsFactory.createList(skillsQuantity);
      const educationDocs = await educationFactory.createList(3);
      const trainingDocs = await educationFactory.createList(3);

      const doc = new ResumeModel({
        ...resume,
        jobs: idMap(jobsDocs),
        skills: idMap(skillsDocs),
        educations: idMap(educationDocs),
        courses: idMap(trainingDocs),
      });

      return doc.save();
    });

    return {
      name: casual.first_name,
      jobTitle: casual.catch_phrase,
      bio: casual.description,
      contacts: contact(2),
      educations,
      courses,
      jobs,
      skills,
    };
  }
);
