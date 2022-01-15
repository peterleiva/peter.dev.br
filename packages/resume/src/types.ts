import type { DateTime } from 'luxon';

export type Company = {
  name: string;
  alias?: String;
};

export type Job = {
  position: string;
  company: Company;
  description: string;

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

export type Education = {
  institution: string;
  title: string;
  status: string;
};

export type Course = {
  title: string;
  started?: DateTime;
  ended: DateTime;
};

export type Training = {
  institution: string;
  courses: Course[];
};
