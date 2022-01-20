import { Job } from 'types';
import { optional, toISO, fromISO } from '../utils';
import { map, evolve } from 'ramda';

export type SerializedJob = Omit<Job, 'activity'> & {
  activity: { start: string; end?: string };
};

export const serialize = map<Job, SerializedJob>(
  evolve({
    activity: {
      start: toISO,
      end: optional(toISO),
    },
  })
);

export const deserialize = map<SerializedJob, Job>(
  evolve({
    activity: {
      start: fromISO,
      end: optional(fromISO),
    },
  })
);
