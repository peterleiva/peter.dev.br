import { NextApiRequest, NextApiResponse } from 'next';
import { getSkillsByTag } from 'services';
import { join } from 'ramda';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { tag } = req.query;
  const normalizedTag = typeof tag === 'string' ? tag : join(',', tag);

  try {
    const skills = await getSkillsByTag(normalizedTag);

    res.status(200).json(skills);
  } catch (error) {
    console.error(error);
    res.status(500).send(`couldn't get skills by tag: ${tag}`);
  }
}
