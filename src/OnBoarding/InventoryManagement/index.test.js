import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import InventoryManagement from './index'
import '@testing-library/jest-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));
describe('InventoryManagement Component', () => {
  const mockNavigate = jest.fn();
  beforeEach(() => {
    useNavigate.mockReturnValue(mockNavigate);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('renders all UI elements correctly', () => {
    render(
      <MemoryRouter>
        <InventoryManagement />
      </MemoryRouter>
    );

    expect(
      screen.getByRole('heading', { name: /inventory management/i })
    ).toBeInTheDocument();
 
    expect(
      screen.getByText(/efficiently track, organize, and update/i)
    ).toBeInTheDocument();

    expect(screen.getByRole('img', { name: /welcome page/i })).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /continue/i })).toBeInTheDocument();
  
    const progressDot = document.querySelector('[class*=progress]');
    expect(progressDot).toBeInTheDocument();
  });
  it('navigates to /order when "Continue" button is clicked', () => {
    render(
      <MemoryRouter>
        <InventoryManagement />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByRole('button', { name: /continue/i }));
    expect(mockNavigate).toHaveBeenCalledWith('/order');
  });
});