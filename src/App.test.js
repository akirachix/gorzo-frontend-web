import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('./SignIn', () => () => (
  <div>
    <h1>WELCOME</h1>
    <h1>LOGIN</h1>
  </div>
));

jest.mock('./SignIn/components/InputField', () => ({ label, placeholder, name }) => (
  <div>
    <label>{label}</label>
    <input placeholder={placeholder} name={name} />
  </div>
));

jest.mock('./SignIn/components/Button', () => ({ text }) => <button>{text}</button>);

describe('App Component', () => {
  test('renders SignIn component', () => {
    render(<App />);
    expect(screen.getByText('WELCOME')).toBeInTheDocument();
    expect(screen.getByText('LOGIN')).toBeInTheDocument();
  });
});