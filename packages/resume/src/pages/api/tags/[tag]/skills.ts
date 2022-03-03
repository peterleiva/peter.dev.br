import { NextApiRequest, NextApiResponse } from 'next';
import { getSkillsByTagId } from 'services';
import locale from '../../locale';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { tag } = req.query;

  if (typeof tag !== 'string') {
    res.status(400);
    return;
  }

  try {
    const skills = await getSkillsByTagId(tag);

    res.status(200).json(skills);
  } catch (error) {
    console.error(error);
    res.status(500);
  }
}

export default locale(handler);
