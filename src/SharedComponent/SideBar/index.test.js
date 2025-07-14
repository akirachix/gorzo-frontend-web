
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Sidebar from '.';
const renderWithRouter = () => {
  return render(
    <MemoryRouter>
      <Sidebar />
    </MemoryRouter>
  );
};

describe('Sidebar Component', () => {
  test('renders hamburger button when sidebar is closed', () => {
    renderWithRouter();
    expect(screen.getByRole('button', { name: /open menu/i })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /close menu/i })).not.toBeInTheDocument();
  });

  test('opens sidebar when hamburger button is clicked', () => {
    renderWithRouter();
    fireEvent.click(screen.getByRole('button', { name: /open menu/i }));
    expect(screen.getByRole('button', { name: /close menu/i })).toBeInTheDocument();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Orders')).toBeInTheDocument();
    expect(screen.getByText('Users')).toBeInTheDocument();
    expect(screen.getByText('Sales')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });

  test('closes sidebar when close button is clicked', () => {
    renderWithRouter();
    fireEvent.click(screen.getByRole('button', { name: /open menu/i }));
    fireEvent.click(screen.getByRole('button', { name: /close menu/i }));
    expect(screen.queryByRole('button', { name: /close menu/i })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /open menu/i })).toBeInTheDocument();
  });

  test('closes sidebar when NavLink is clicked', () => {
    renderWithRouter();
    fireEvent.click(screen.getByRole('button', { name: /open menu/i }));
    const dashboardLink = screen.getByText('Dashboard').closest('a');
    fireEvent.click(dashboardLink);
    expect(screen.queryByRole('button', { name: /close menu/i })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /open menu/i })).toBeInTheDocument();
  });

  test('navigates to correct routes', () => {
    renderWithRouter();
    fireEvent.click(screen.getByRole('button', { name: /open menu/i }));
    const links = [
      { text: 'Dashboard', path: '/home' },
      { text: 'Orders', path: '/orders' },
      { text: 'Users', path: '/users' },
      { text: 'Sales', path: '/sales' },
      { text: 'Settings', path: '/settings' },
    ];
    links.forEach(({ text, path }) => {
      const link = screen.getByText(text).closest('a');
      expect(link).toHaveAttribute('href', path);
    });
  });
});