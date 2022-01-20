import { Factory } from 'fishery';
import casual from 'casual';
import SkillModel, { Skill, SkillDocument } from 'services/models/skill';
import { times } from 'ramda';

interface TransientParams {
  tags: number;
}
const tagFactory = times(() => ({ name: casual.word }));

export default Factory.define<Skill, TransientParams, SkillDocument>(
  ({
    onCreate,
    transientParams: { tags: tagsQuantity = 1 },
    associations: { tags },
  }) => {
    onCreate(async skill => SkillModel.create(skill));

    return {
      name: casual.title,
      tags: tags ?? tagFactory(tagsQuantity),
    };
  }
);
