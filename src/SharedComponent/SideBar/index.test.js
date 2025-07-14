

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
   test('navigates to correct route on link click', () => {
    renderWithRouter(
      <>
        <Sidebar />
        <Routes>
          <Route path="/users" element={<div>Users Page</div>} />
        </Routes>
      </>,
      { route: '/' }
    );

    fireEvent.click(screen.getByRole('button', { name: /open menu/i }));
    fireEvent.click(screen.getByText(/users/i));
    expect(screen.getByText(/users page/i)).toBeInTheDocument();
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
