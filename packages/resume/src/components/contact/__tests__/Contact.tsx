import { render, waitFor } from '@testing-library/react';
import factory from 'test/factories/contact';
import Contact from '../Contact';

describe('Contact', () => {
  test('render contact info', async () => {
    const [contact] = factory(1);

    const { findByText } = render(
      <Contact href={contact.link} icon={contact.icon}>
        {contact.username}
      </Contact>
    );

    const username = await waitFor(() => findByText(contact.username));

    expect(username).toBeInTheDocument();
  });
});
