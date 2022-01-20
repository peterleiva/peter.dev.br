import { DateTime } from 'luxon';

export const fromISO = (date: string): DateTime => DateTime.fromISO(date);

export const toDateTime = (date: Date): DateTime => DateTime.fromJSDate(date);

export const optional = <T, U>(fn: (arg: T) => U) => (arg?: T): U | undefined =>
  arg ? fn(arg) : undefined;

export const toISO = (date: DateTime): string => date.toISO();

export const optionalToDateTime = optional(toDateTime);
