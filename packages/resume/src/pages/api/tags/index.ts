import { NextApiRequest, NextApiResponse } from 'next';
import { getAllTags } from 'services';
import locale from '../locale';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const tags = await getAllTags();

    res.status(200).json(tags);
  } catch (error) {
    console.error(error);
    res.status(500).send('error fetching all tags');
  }
}

export default locale(handler);
