import { NextApiRequest, NextApiResponse } from 'next';
import { getSkillsByTag } from 'services';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { tag } = req.query;

  if (typeof tag !== 'string') {
    res.status(400);
    return;
  }

  try {
    const skills = await getSkillsByTag(tag);

    res.status(200).json(skills);
  } catch (error) {
    console.error(error);
    res.status(500);
  }
}

export default handler;
