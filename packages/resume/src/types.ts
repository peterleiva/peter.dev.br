import type { DateTime } from 'luxon';
import { LibIcon } from './lib/icon-loader';

export type Resume = {
  name: string;
  jobTitle: string;
  contacts: Contact[];
  bio?: string;
  skills: Skill[];
  courses: Courses[];
  educations: Education[];
  jobs: Job[];
};

export type Contact = {
  username: string;
  link: string;
  name: string;
  icon: Partial<{
    lib: LibIcon;
    name: string;
  }>;
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

export type Company = {
  name: string;
  alias?: string;
};

export type Skill = {
  name: string;
  tags: Tag[];
  icon?: string;
};

export type Tag = string;

export type Education = {
  title: string;
  description?: string;
  institution: {
    name: string;
  };
  started: DateTime;
  ended?: DateTime;
};

export type Course = Omit<Education, 'institution'>;

export type Courses = {
  institution: string;
  courses: Course[];
};
