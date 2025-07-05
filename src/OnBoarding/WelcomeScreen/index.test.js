import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import Welcome from './index'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));
describe('Welcome Component', () => {
  const mockNavigate = jest.fn();
  beforeEach(() => {
    useNavigate.mockReturnValue(mockNavigate);
  });
  it('renders welcome screen content correctly', () => {
    render(
      <MemoryRouter>
        <Welcome />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { name: /welcome/i })).toBeInTheDocument();
    expect(screen.getByText(/take your market stall online/i)).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /welcome page/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /get started/i })).toBeInTheDocument();
  });
  it('navigates to /inventory when button is clicked', () => {
    render(
      <MemoryRouter>
        <Welcome />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByRole('button', { name: /get started/i }));
    expect(mockNavigate).toHaveBeenCalledWith('/inventory');
  });
});