import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Techs from '../Techs';
import casual from 'casual';

const setupSkills = () => {
  return {
    name: casual.title,
    tags: [],
  };
};

describe('Techs', () => {
  const skill = setupSkills();

  test('renders techs', () => {
    const { container } = render(<Techs techs={[skill]} />);

    expect(container).toHaveTextContent(skill.name);
  });

  test('renders nothing when techs is empty', () => {
    const { container } = render(<Techs techs={[]} />);

    expect(container).toBeEmptyDOMElement();
  });

  test('toggle techs on demand', () => {
    const { container, getByRole } = render(<Techs techs={[skill]} />);

    const button = getByRole('button');
    userEvent.click(button);

    expect(container).not.toHaveTextContent(skill.name);

    userEvent.click(button);

    expect(container).toHaveTextContent(skill.name);
  });
});
