export type { Translations } from './plugins';

export { default as JobModel, type JobDocument, type Job } from './job';

export {
  default as EducationModel,
  type Education,
  type EducationDocument,
} from './education';

export {
  default as SkillModel,
  type Skill,
  type SkillDocument,
  type Tag,
} from './skill';

export {
  default as ResumeModel,
  type Resume,
  type ResumeDocument,
  type Contact,
} from './resume';
