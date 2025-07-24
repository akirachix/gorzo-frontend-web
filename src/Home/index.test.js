import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '.';

jest.mock('./components/DashboardStats', () => () => <div data-testid="dashboard-stats" />);
jest.mock('./components/UserProgressionChart', () => () => <div data-testid="sales-chart" />);
jest.mock('./components/GroupChart', () => () => <div data-testid="group-chart" />);
jest.mock('./components/VendorPerformance', () => () => <div data-testid="vendor-performance" />);

describe('Home Component', () => {
  it('renders the admin dashboard title', () => {
    render(<Home />);
    expect(screen.getByText(/admin dashboard/i)).toBeInTheDocument();
  });

  it('renders all child components', () => {
    render(<Home />);

    expect(screen.getByTestId('dashboard-stats')).toBeInTheDocument();
    expect(screen.getByTestId('sales-chart')).toBeInTheDocument();
    expect(screen.getByTestId('group-chart')).toBeInTheDocument();
    expect(screen.getByTestId('vendor-performance')).toBeInTheDocument();
  });
});
