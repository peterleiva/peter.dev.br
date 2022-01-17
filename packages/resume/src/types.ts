import type { DateTime } from 'luxon';
import type { Education as IEducation } from 'models/education';

export type Company = {
  name: string;
  alias?: String;
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

export type Courses = {
  institution: string;
  courses: Omit<Education, 'institution'>[];
};
