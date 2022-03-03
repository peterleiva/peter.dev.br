import { pick } from 'ramda';
import type { Education } from 'types';
import { toDateTime, optionalToDateTime } from 'lib';
import { type EducationDocument } from './models/education';
import { ResumeDocument } from './models/resume';
import locale from './locale';

export default async function getEducations(
  resume: ResumeDocument
): Promise<Education[]> {
  const { educations } = await resume.populate<{
    educations: EducationDocument[];
  }>('educations');

  return educations.map((edu: EducationDocument) => {
    return {
      ...pick(['title', 'description'], edu.translate(locale.getLocale())),
      institution: pick(['name', ''], edu.institution),
      started: toDateTime(edu.started),
      ended: optionalToDateTime(edu.ended),
    };
  });
}
