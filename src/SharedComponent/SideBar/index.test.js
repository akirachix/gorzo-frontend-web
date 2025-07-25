import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Sidebar from '.';
import { BrowserRouter } from 'react-router-dom';

jest.mock('../../utils/auth', () => ({
  signOut: jest.fn(),
}));
import { signOut } from '../../utils/auth';
const renderWithRouter = (ui) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};
describe('Sidebar', () => {
 beforeEach(() => {
  delete window.location;
  Object.defineProperty(window, 'location', {
    writable: true,
    value: {
      href: 'http://localhost/',
      origin: 'http://localhost',
    
    },
  });
});
  test('renders hamburger button initially and toggles sidebar when clicked', () => {
    renderWithRouter(<Sidebar />);
  
    const hamburgerBtn = screen.getByRole('button', { name: /open menu/i });
    expect(hamburgerBtn).toBeInTheDocument();

    const sidebarNav = screen.getByRole('navigation', { name: /sidebar navigation/i });
    expect(sidebarNav.parentElement).not.toHaveClass('open');

    fireEvent.click(hamburgerBtn);

    expect(sidebarNav.parentElement).toHaveClass('open');
 
    const closeBtn = screen.getByRole('button', { name: /close menu/i });
    expect(closeBtn).toBeInTheDocument();
   
    expect(screen.queryByRole('button', { name: /open menu/i })).not.toBeInTheDocument();

    fireEvent.click(closeBtn);
    expect(sidebarNav.parentElement).not.toHaveClass('open');
  });
  test('nav links are rendered and clicking a nav link closes sidebar', () => {
    renderWithRouter(<Sidebar />);

    fireEvent.click(screen.getByRole('button', { name: /open menu/i }));
    
    const dashboardLink = screen.getByText(/dashboard/i);
    const ordersLink = screen.getByText(/orders/i);
    const usersLink = screen.getByText(/users/i);
    const signOutBtn = screen.getByRole('button', { name: /sign out/i });
    expect(dashboardLink).toBeInTheDocument();
    expect(ordersLink).toBeInTheDocument();
    expect(usersLink).toBeInTheDocument();
    expect(signOutBtn).toBeInTheDocument();

    fireEvent.click(ordersLink.closest('a'));
    const sidebarNav = screen.getByRole('navigation', { name: /sidebar navigation/i });
    expect(sidebarNav.parentElement).not.toHaveClass('open');
  });
  test('sign out modal appears and confirm/cancel buttons work', () => {
    renderWithRouter(<Sidebar />);

    fireEvent.click(screen.getByRole('button', { name: /open menu/i }));
   
    const signOutBtn = screen.getByRole('button', { name: /sign out/i });
    fireEvent.click(signOutBtn);

    expect(screen.getByText(/confirm sign out/i)).toBeInTheDocument();
    expect(screen.getByText(/are you sure you want to sign out/i)).toBeInTheDocument();
    
    const cancelBtn = screen.getByRole('button', { name: /no/i });
    fireEvent.click(cancelBtn);
    expect(screen.queryByText(/confirm sign out/i)).not.toBeInTheDocument();
    expect(signOut).not.toHaveBeenCalled();
   
    fireEvent.click(signOutBtn);

    const confirmBtn = screen.getByRole('button', { name: /yes/i });
  
    // delete window.location;
    // window.location = { href: '/' };
    fireEvent.click(confirmBtn);
    expect(signOut).toHaveBeenCalled();
    // expect(window.location.href).toBe('/');
 
    expect(screen.queryByText(/confirm sign out/i)).not.toBeInTheDocument();
  });
});
