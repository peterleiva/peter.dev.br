import { DateTime } from 'luxon';

export const fromISO = (date: string): DateTime => DateTime.fromISO(date);

export const toDateTime = (date: Date): DateTime => DateTime.fromJSDate(date);

// TODO: dont't use any
export const optional =
  <T, U>(fn: (arg: T) => U) =>
  (arg?: T | null): U | undefined =>
    arg ? fn(arg) : (null as any);

export const toISO = (date: DateTime): string => date.toISO();

export const optionalToDateTime = optional(toDateTime);

export const debounce = (f: () => unknown, wait = 30_000) => {
  const cancelable = setTimeout(f, wait);
  const cancel = () => clearTimeout(cancelable);

  return { cancel };
};
