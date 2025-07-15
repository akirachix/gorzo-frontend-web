

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Sidebar from '.';

const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);
  return render(
    <MemoryRouter initialEntries={[route]}>
      <Routes>
        <Route path="*" element={ui} />
      </Routes>
    </MemoryRouter>
  );
};

describe('Sidebar Component', () => {

test('navigates to correct routes for multiple sidebar links', () => {
  renderWithRouter(
    <>
      <Sidebar />
      <Routes>
        <Route path="/home" element={<div>Dashboard Page</div>} />
        <Route path="/users" element={<div>Users Page</div>} />
        <Route path="/orders" element={<div>Orders Page</div>} />
        <Route path="/salestracking" element={<div>Sales Page</div>} />
        <Route path="/settings" element={<div>Settings Page</div>} />
      </Routes>
    </>,
    { route: '/' }
  );

  fireEvent.click(screen.getByText(/dashboard/i)); 
  expect(screen.getByText(/dashboard page/i)).toBeInTheDocument();

  fireEvent.click(screen.getByText(/users/i));
  expect(screen.getByText(/users page/i)).toBeInTheDocument();

  fireEvent.click(screen.getByText(/orders/i));
  expect(screen.getByText(/orders page/i)).toBeInTheDocument();

  fireEvent.click(screen.getByText(/sales/i));
  expect(screen.getByText(/sales page/i)).toBeInTheDocument();

  fireEvent.click(screen.getByText(/settings/i));
  expect(screen.getByText(/settings page/i)).toBeInTheDocument();
});





  test('renders hamburger menu initially', () => {
    renderWithRouter(<Sidebar />);
    expect(screen.getByRole('button', { name: /open menu/i })).toBeInTheDocument();
  });

  test('clicking hamburger opens the sidebar', () => {
    renderWithRouter(<Sidebar />);
    fireEvent.click(screen.getByRole('button', { name: /open menu/i }));
    expect(screen.getByRole('button', { name: /close menu/i })).toBeInTheDocument();
    expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
  });

  test('clicking close button hides sidebar', () => {
    renderWithRouter(<Sidebar />);
    fireEvent.click(screen.getByRole('button', { name: /open menu/i }));
    fireEvent.click(screen.getByRole('button', { name: /close menu/i }));
    expect(screen.getByRole('button', { name: /open menu/i })).toBeInTheDocument();
  });

  test('clicking nav link closes sidebar', () => {
    renderWithRouter(<Sidebar />);
    fireEvent.click(screen.getByRole('button', { name: /open menu/i }));
    fireEvent.click(screen.getByText(/orders/i));
    expect(screen.getByRole('button', { name: /open menu/i })).toBeInTheDocument();
  });

 
});
