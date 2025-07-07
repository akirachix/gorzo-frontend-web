import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

beforeEach(() => {
  jest.resetModules();
});
function renderWithPath(path) {
  window.history.pushState({}, '', path);
  return render(<App />);
}

jest.mock('./OnBoarding/SplashScreen', () => () => <div>Splash Screen</div>);
jest.mock('./OnBoarding/WelcomeScreen', () => () => <div>Welcome Screen</div>);
jest.mock('./OnBoarding/OrderManagement', () => () => <div>Order Management</div>);
jest.mock('./OnBoarding/InventoryManagement', () => () => <div>Inventory Management</div>);
jest.mock('./OnBoarding/SalesTracking', () => () => <div>Sales Tracking</div>);
jest.mock('./OnBoarding/GetStarted', () => () => <div>Get Started</div>);
describe('App Routing', () => {
  it('renders SplashScreen at "/"', () => {
    renderWithPath('/');
    expect(screen.getByText('Splash Screen')).toBeInTheDocument();
  });
  it('renders Welcome at "/welcome"', () => {
    renderWithPath('/welcome');
    expect(screen.getByText('Welcome Screen')).toBeInTheDocument();
  });
  it('renders InventoryManagement at "/inventory"', () => {
    renderWithPath('/inventory');
    expect(screen.getByText('Inventory Management')).toBeInTheDocument();
  });
  it('renders OrderManagement at "/order"', () => {
    renderWithPath('/order');
    expect(screen.getByText('Order Management')).toBeInTheDocument();
  });
  it('renders SalesTracking at "/sales"', () => {
    renderWithPath('/sales');
    expect(screen.getByText('Sales Tracking')).toBeInTheDocument();
  });
  it('renders GetStarted at "/getStarted"', () => {
    renderWithPath('/getStarted');
    expect(screen.getByText('Get Started')).toBeInTheDocument();
  });
});