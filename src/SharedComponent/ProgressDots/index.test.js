
import { render, screen, fireEvent } from '@testing-library/react';
import ProgressDot from '.';

test('renders 3 dots', () => {
  const { container } = render(<ProgressDot current={0} />);
  const dots = container.querySelectorAll('.dot');
  expect(dots.length).toBe(3);
});
test('activates the correct dot when current is 0', () => {
  const { container } = render(<ProgressDot current={0} />);
  const dots = container.querySelectorAll('.dot');
  expect(dots[0]).toHaveClass('active-dot');
  expect(dots[1]).not.toHaveClass('active-dot');
  expect(dots[2]).not.toHaveClass('active-dot');
});
test('activates the correct dot when current is 1', () => {
  const { container } = render(<ProgressDot current={1} />);
  const dots = container.querySelectorAll('.dot');
  expect(dots[1]).toHaveClass('active-dot');
  expect(dots[0]).not.toHaveClass('active-dot');
  expect(dots[2]).not.toHaveClass('active-dot');
});
test('activates the correct dot when current is 2', () => {
  const { container } = render(<ProgressDot current={2} />);
  const dots = container.querySelectorAll('.dot');
  expect(dots[2]).toHaveClass('active-dot');
  expect(dots[0]).not.toHaveClass('active-dot');
  expect(dots[1]).not.toHaveClass('active-dot');
});