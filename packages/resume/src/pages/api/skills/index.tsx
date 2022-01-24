import { NextApiRequest, NextApiResponse } from 'next';
import { getAllSkills } from 'services';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const skills = await getAllSkills();
    res.status(200).json(skills);
  } catch (error) {
    console.error(error);
    res.status(500);
  }
}
