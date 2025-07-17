import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import GetStarted from './index';
// Mock useNavigate from react-router-dom
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));
// Optional: Mock your Button component if it does internal routing
jest.mock('../../SharedComponent/Button', () => ({
  Button: ({ text, onClick }) => (
    <button onClick={onClick}>{text}</button>
  ),
}));
describe('GetStarted Component', () => {
  it('renders welcome message and image', () => {
    render(<GetStarted />);
    expect(screen.getByText(/Let's\s+build your digital duka together/i)).toBeInTheDocument();
    expect(screen.getByAltText(/Welcome Page/i)).toBeInTheDocument();
    expect(screen.getByText(/Ready to sell online/i)).toBeInTheDocument();
  });
  it('navigates on button click', () => {
    render(<GetStarted />);
    const button = screen.getByText(/Sign Up/i);
    fireEvent.click(button);
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});