
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Sidebar from '.';
import { BrowserRouter } from 'react-router-dom';

const renderWithRouter = (ui) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('Sidebar Hamburger Toggle', () => {
  test('shows hamburger icon by default and toggles sidebar', () => {
    renderWithRouter(<Sidebar />);

    const hamburgerBtn = screen.getByRole('button');
    expect(hamburgerBtn).toBeInTheDocument();
    expect(hamburgerBtn).toContainHTML('svg'); 

    fireEvent.click(hamburgerBtn);

    const closeBtn = screen.getByRole('button');
    expect(closeBtn).toBeInTheDocument();
    expect(closeBtn).toContainHTML('svg'); 

    fireEvent.click(closeBtn);

    const newHamburger = screen.getByRole('button');
    expect(newHamburger).toBeInTheDocument();
    expect(newHamburger).toContainHTML('svg'); 
  });
});

