import React from "react";
import { render, screen } from "@testing-library/react";
import GroupChart from ".";
import useGroupChartData from "../../../hooks/useGroupChartData";

jest.mock('../../../hooks/useGroupChartData');

describe('GroupChart component', () => {
  it('shows loading message while loading', () => {
    useGroupChartData.mockReturnValue({
      loading: true,
      error: null,
      chartData: null,
    });

    render(<GroupChart />);
    expect(screen.getByText(/Loading chart data/i)).toBeInTheDocument();
  });

  it('shows error message if error occurred', () => {
    useGroupChartData.mockReturnValue({
      loading: false,
      error: new Error('Failed to load'),
      chartData: null,
    });

    render(<GroupChart />);
    expect(screen.getByText(/Error loading data/i)).toBeInTheDocument();
  });

  it('renders BarChart with correct props when data is loaded', () => {
    const mockData = {
      months: ['Jan', 'Feb', 'Mar'],
      allGroupCounts: [10, 20, 15],
      completedGroupCounts: [5, 15, 10],
    };

    useGroupChartData.mockReturnValue({
      loading: false,
      error: null,
      chartData: mockData,
    });

    const { container } = render(<GroupChart />);
    
  
    expect(container.textContent).toMatch(/Created Groups/i);
    expect(container.textContent).toMatch(/Completed Groups/i);
  });
});