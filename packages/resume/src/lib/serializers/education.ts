import { map, evolve } from 'ramda';
import { Education } from 'types';
import { fromISO, optional, toISO } from '../utils';

export type SerializedEducation = Omit<Education, 'started' | 'ended'> & {
  started: string;
  ended?: string;
};

export const serialize = map<Education, SerializedEducation>(
  evolve({
    started: toISO,
    ended: optional(toISO),
  })
);

export const deserialize = map<SerializedEducation, Education>(
  evolve({
    started: fromISO,
    ended: optional(fromISO),
  })
);
