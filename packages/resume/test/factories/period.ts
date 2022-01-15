import { compose, invoker } from 'ramda';
import { DateTime } from 'luxon';
import casual from 'casual';

const dateFactory = () => DateTime.fromISO(casual.date());
const toJSDate: () => Date = invoker(0, 'toJSDate');

const jsDateFactory = compose<[], DateTime, Date>(toJSDate, dateFactory);

const twoYearAhead = compose<[Date], DateTime, DateTime, Date>(
  toJSDate,
  date => date.plus({ year: 2 }),
  date => DateTime.fromJSDate(date)
);

export const period = () => {
  const start = jsDateFactory();
  const end = twoYearAhead(start);

  return { start, end };
};
