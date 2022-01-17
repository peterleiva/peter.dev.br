import { Factory } from 'fishery';
import casual from 'casual';
import SkillModel, { Skill, SkillDocument } from 'models/skill';
import { times } from 'ramda';

interface TransientParams {
  tags: number;
}
const tagFactory = times(() => ({ name: casual.word }));

export default Factory.define<Skill, TransientParams, SkillDocument>(
  ({ onCreate, transientParams: { tags: tagsQuantity = 1 } }) => {
    onCreate(async skill => {
      return await SkillModel.create(skill);
    });

    return {
      name: casual.title,
      tags: tagFactory(tagsQuantity),
    };
  }
);
