import { NextApiRequest, NextApiResponse } from 'next';
import { getAllSkills } from 'services';
import locale from '../locale';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const skills = await getAllSkills();
    res.status(200).json(skills);
  } catch (error) {
    console.error(error);
    res.status(500);
  }
}

export default locale(handler);
