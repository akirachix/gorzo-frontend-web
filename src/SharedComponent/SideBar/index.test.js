
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

    //  Click hamburger to open sidebar
    fireEvent.click(hamburgerBtn);

    //  Now FaTimes (close icon) should appear
    const closeBtn = screen.getByRole('button');
    expect(closeBtn).toBeInTheDocument();
    expect(closeBtn).toContainHTML('svg'); // FaTimes

    //  Click close icon to close sidebar
    fireEvent.click(closeBtn);

    //  Hamburger icon should appear again
    const newHamburger = screen.getByRole('button');
    expect(newHamburger).toBeInTheDocument();
    expect(newHamburger).toContainHTML('svg'); // FaBars again
  });
});
