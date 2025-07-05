import { render, screen, fireEvent } from '@testing-library/react';
import { useNavigate, MemoryRouter } from 'react-router-dom';
import SalesTracking from '.';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));
test('renders SalesTracking UI correctly', () => {
  render(
    <MemoryRouter>
      <SalesTracking />
    </MemoryRouter>
  );

  expect(screen.getByText('Sales Tracking')).toBeInTheDocument();
 
  expect(screen.getByText(/sales and income tracking/i)).toBeInTheDocument();

  expect(screen.getByAltText('Welcome Page')).toBeInTheDocument();

  expect(screen.getByText('Continue')).toBeInTheDocument();
});
test('navigates to /getstarted when Continue is clicked', () => {
  const navigate = jest.fn();
  useNavigate.mockReturnValue(navigate);
  render(
    <MemoryRouter>
      <SalesTracking />
    </MemoryRouter>
  );
  fireEvent.click(screen.getByText('Continue'));
  expect(navigate).toHaveBeenCalledWith('/getstarted');
});