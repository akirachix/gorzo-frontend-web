import React from 'react';
import { render, screen } from '@testing-library/react';
import StatsCard from '.';


describe('StatsCard Component', () => {
  test('renders the title and value correctly', () => {
    render(<StatsCard title="Users" value="100" icon="user" />);

    const titleElement = screen.getByText(/Users/i);
    expect(titleElement).toBeInTheDocument();

    const valueElement = screen.getByText(/100/i);
    expect(valueElement).toBeInTheDocument();
  });
});
