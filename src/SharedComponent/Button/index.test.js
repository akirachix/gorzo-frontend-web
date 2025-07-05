import { render, screen, fireEvent } from '@testing-library/react';

import { Button } from '.';

test('renders button with correct text and class', () => {
  render(<Button text="Click Me" variant="primary" onClick={() => {}} />);
  const button = screen.getByText('Click Me');
  expect(button).toBeInTheDocument();
  expect(button).toHaveClass('shared-button primary');
});
test('calls onClick when clicked', () => {
  const handleClick = jest.fn();
  render(<Button text="Submit" variant="secondary" onClick={handleClick} />);
  const button = screen.getByText('Submit');
  fireEvent.click(button);
  expect(handleClick).toHaveBeenCalledTimes(1);
});