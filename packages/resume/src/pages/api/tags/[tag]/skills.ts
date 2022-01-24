import { NextApiRequest, NextApiResponse } from 'next';
import { getSkillsByTag } from 'services';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { tag } = req.query;

  if (typeof tag !== 'string') {
    return res.status(400);
  }

  try {
    const skills = await getSkillsByTag(tag);

    res.status(200).json(skills);
  } catch (error) {
    console.error(error);
    res.status(500).send(`couldn't get skills by tag: ${tag}`);
  }
}
