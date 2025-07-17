import { render, screen, fireEvent } from '@testing-library/react';
import { useNavigate, MemoryRouter } from 'react-router-dom';
import OrderManagement from '.';


jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));
test('renders OrderManagement UI correctly', () => {
  render(
    <MemoryRouter>
      <OrderManagement />
    </MemoryRouter>
  );

  expect(screen.getByText('Order Management')).toBeInTheDocument();

  expect(screen.getByText(/centralized platform to view, track, and manage/i)).toBeInTheDocument();

  expect(screen.getByAltText('Welcome Page')).toBeInTheDocument();

  expect(screen.getByText('Continue')).toBeInTheDocument();
});
test('navigates to /sales when Continue is clicked', () => {
  const navigate = jest.fn();
  useNavigate.mockReturnValue(navigate);
  render(
    <MemoryRouter>
      <OrderManagement />
    </MemoryRouter>
  );
  fireEvent.click(screen.getByText('Continue'));
  expect(navigate).toHaveBeenCalledWith('/sales');
});