import { DateTime } from 'luxon';
import { compose, defaultTo, invoker, isNil, unless } from 'ramda';
import { useTranslation } from 'react-i18next';

const monthYear = compose<[DateTime | undefined], DateTime, string>(
  invoker(1, 'toFormat')('yyyy-LL'),
  defaultTo(DateTime.now())
);

type ActivityProps = {
  time?: DateTime;
  presentLabel?: string;
};

export default function Activity({
  time,
  presentLabel = 'Present',
}: ActivityProps) {
  const activity = compose(
    defaultTo(presentLabel),
    unless(isNil, invoker(1, 'toFormat')('LLL yyyy'))
  );
  const { i18n } = useTranslation();

  return (
    <time dateTime={monthYear(time)}>
      {activity(time?.setLocale(i18n.resolvedLanguage))}
    </time>
  );
}
