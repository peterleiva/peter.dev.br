import { DateTime } from 'luxon';
import { compose, defaultTo, invoker, isNil, unless } from 'ramda';

const activity = compose(
  defaultTo('Present'),
  unless(isNil, invoker(1, 'toFormat')('LLL yyyy'))
);

const monthYear = compose<[DateTime | undefined], DateTime, string>(
  invoker(1, 'toFormat')('yyyy-LL'),
  defaultTo(DateTime.now())
);

type ActivityProps = {
  time?: DateTime;
};

export default function Activity({ time }: ActivityProps) {
  return <time dateTime={monthYear(time)}>{activity(time)}</time>;
}
