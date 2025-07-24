import React from 'react';
import { render, screen } from '@testing-library/react';
import DashboardStats from '.';
import '@testing-library/jest-dom';

jest.mock('../../../hooks/useFetchStatsCard', () => ({
  __esModule: true,
  default: jest.fn()
}));

import useStatsData from '../../../hooks/useFetchStatsCard';

describe('DashboardStats Component', () => {
  it('shows loading state', () => {
    useStatsData.mockReturnValue({
      vendorCount: 0,
      customerCount: 0,
      activeGroups: 0,
      completedGroups: 0,
      loading: true,
      error: null
    });

    render(<DashboardStats />);
    expect(screen.getByText(/loading stats/i)).toBeInTheDocument();
  });

  it('shows error state', () => {
    useStatsData.mockReturnValue({
      vendorCount: 0,
      customerCount: 0,
      activeGroups: 0,
      completedGroups: 0,
      loading: false,
      error: 'Failed to load'
    });

    render(<DashboardStats />);
    expect(screen.getByText(/error: failed to load/i)).toBeInTheDocument();
  });

  it('displays all stats correctly', () => {
    useStatsData.mockReturnValue({
      vendorCount: 5,
      customerCount: 10,
      activeGroups: 2,
      completedGroups: 3,
      loading: false,
      error: null
    });

    render(<DashboardStats />);

    expect(screen.getByText(/total vendors/i)).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();

    expect(screen.getByText(/total customers/i)).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();

    expect(screen.getByText(/active group buying/i)).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();

    expect(screen.getByText(/completed group buys/i)).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });
});
