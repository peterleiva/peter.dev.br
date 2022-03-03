import { locale } from 'services';
import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

const middleware =
  (handler: NextApiHandler) =>
  (req: NextApiRequest & { language?: string }, res: NextApiResponse) => {
    if (typeof req.headers.locale === 'string') {
      locale.setLocale(req.headers.locale);
    }

    return handler(req, res);
  };

export default middleware;
