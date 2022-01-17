import Resume, { ResumeDocument } from 'models/resume';

export const getResume = async (): Promise<ResumeDocument | null> =>
  Resume.findOne();
