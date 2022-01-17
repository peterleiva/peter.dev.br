import { DateTime } from 'luxon';

export const optional = <T, U>(fn: (arg: T) => U) => (arg?: T) =>
  arg ? fn(arg as NonNullable<T>) : undefined;

export const toISO = (date: DateTime) => date.toISO();

export const toDateTime = (date: Date) => DateTime.fromJSDate(date);
