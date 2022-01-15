import casual from 'casual';
import { Factory } from 'fishery';
import EducationModel, { Education } from 'models/education';
import { period } from './period';

export default Factory.define<Education>(({ onCreate }) => {
  onCreate(async education => EducationModel.create(education));

  const { start: started, end: ended } = period();

  return {
    title: casual.title,
    institution: { name: casual.company_name },
    started,
    ended,
  };
});
