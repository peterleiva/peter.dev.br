import { optional, toISO } from './serialization-utils';
import * as R from 'ramda';
import { DateTime } from 'luxon';

export const jobSerializer = R.map(
  R.evolve({
    activity: {
      start: toISO,
      end: optional(toISO),
    },
  })
);

export const jobDeserializer = R.map(
  R.evolve({
    activity: {
      start: DateTime.fromISO,
      end: DateTime.fromISO,
    },
  })
);

export const educationSerializer = R.map(
  R.evolve({
    started: toISO,
    ended: optional(toISO),
  })
);

export const educationDeserializer = R.map(
  R.evolve({
    started: DateTime.fromISO,
    ended: DateTime.fromISO,
  })
);

export const courseSerializer = R.map(
  R.evolve({
    courses: educationSerializer,
  })
);
