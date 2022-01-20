import type { DateTime } from 'luxon';
import type { Education as IEducation } from 'services/models/education';
import type { Resume as IResume, Contact } from 'services/models/resume';

export { Contact };

export type Company = {
  name: string;
  alias?: string;
};

export type Job = {
  position: string;
  company: Company;
  description?: string;

  activity: {
    start: DateTime;
    end?: DateTime;
  };

  techs: Skill[];
};

export type Tag = string;

export type Skill = {
  name: string;
  tags: Tag[];
  icon?: string;
};

export type Education = Omit<IEducation, 'started' | 'ended'> & {
  started: DateTime;
  ended?: DateTime;
};

export type Course = Omit<Education, 'institution'>;

export type Courses = {
  institution: string;
  courses: Course[];
};

export type Resume = Pick<IResume, 'bio' | 'contacts'> & {
  skills: Skill[];
  courses: Courses[];
  educations: Education[];
  jobs: Job[];
};
