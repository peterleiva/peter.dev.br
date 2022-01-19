import { render } from '@testing-library/react';
import { DateTime } from 'luxon';
import Activity from '../Activity';

describe('Activity', () => {
  test("renders 'present' when no activity", () => {
    const { container } = render(<Activity />);

    expect(container).toHaveTextContent(/present/i);
  });

  test('render Month and year of activity', () => {
    const date = {
      year: 1829,
      month: 4,
    };
    const activity = DateTime.fromObject(date);

    const { container } = render(<Activity time={activity} />);

    expect(container).toHaveTextContent(activity.toFormat('LLL yyyy'));
  });

  test('render custom Present label', () => {
    const label = '-';
    const { container } = render(<Activity presentLabel={label} />);

    expect(container).toHaveTextContent(label);
  });
});
