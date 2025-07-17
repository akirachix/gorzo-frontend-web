import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import SplashScreen from './index'
import '@testing-library/jest-dom';
import { act } from 'react';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));
jest.useFakeTimers();
describe('SplashScreen Component', () => {
  const mockNavigate = jest.fn();
  beforeEach(() => {
    useNavigate.mockReturnValue(mockNavigate);
  });
  afterEach(() => {
    jest.clearAllTimers();
    jest.clearAllMocks();
  });
  it('renders splash screen text', () => {
    render(
      <MemoryRouter>
        <SplashScreen />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: /haba haba/i })).toBeInTheDocument();
    expect(screen.getByText(/Little by little, go digital/i)).toBeInTheDocument();
  });
  it('applies fade-in and fade-out classes and navigates after delay', () => {
    render(
      <MemoryRouter>
        <SplashScreen />
      </MemoryRouter>
    );
    const container = document.querySelector('.splash-container');

    expect(container).toHaveClass('fade-in');

    act(() => {
      jest.advanceTimersByTime(2500);
    });
    expect(container).toHaveClass('fade-out');

    act(() => {
      jest.advanceTimersByTime(1000); 
    });
    expect(mockNavigate).toHaveBeenCalledWith('/welcome');
  });
});