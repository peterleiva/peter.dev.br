import { SuccessMessage as FlashMessage } from '../FlashMessage';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import casual from 'casual';

const setup = () => {
  return {
    title: casual.title,
    body: casual.text,
  };
};

describe('FlashMessage', () => {
  const message = setup();

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('renders message', () => {
    const { container } = render(
      <FlashMessage title={message.title}>{message.body}</FlashMessage>
    );

    expect(container).toHaveTextContent(message.title);
    expect(container).toHaveTextContent(message.body);
  });

  test('closes flash message', () => {
    const { container, getByRole } = render(
      <FlashMessage title={message.title}>{message.body}</FlashMessage>
    );

    userEvent.click(getByRole('button'));

    expect(container).not.toHaveTextContent(message.title);
    expect(container).not.toHaveTextContent(message.body);
  });

  test('auto close the message', async () => {
    jest.spyOn(global, 'setTimeout');

    render(
      <FlashMessage title={message.title} autoClose={300}>
        {message.body}
      </FlashMessage>
    );

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.anything(), 300);
  });
});
