import React from "react";
import { render, screen } from "@testing-library/react";
import GroupChart from ".";
import useGroupChartData from "../../../hooks/useGroupChartData";

jest.mock('../../../hooks/useGroupChartData');

describe("GroupChart component", () => {
  test("displays loading message initially", () => {
    useGroupChartData.mockReturnValue({
      chartData: {},
      loading: true,
      error: null,
    });

    render(<GroupChart />);
    expect(screen.getByText(/loading chart data/i)).toBeInTheDocument();
  });

  test("displays error message on fetch failure", () => {
    useGroupChartData.mockReturnValue({
      chartData: {},
      loading: false,
      error: "Something went wrong",
    });

    render(<GroupChart />);
    expect(screen.getByText(/error loading data/i)).toBeInTheDocument();
  });

  test("renders BarChart with correct data", () => {
    useGroupChartData.mockReturnValue({
      chartData: {
        months: ["January", "February"],
        allGroupCounts: [3, 5],         
        completedGroupCounts: [2, 4],
      },
      loading: false,
      error: null,
    });

    render(<GroupChart />);

    expect(screen.getByText(/all groups/i)).toBeInTheDocument();
    expect(screen.getByText(/completed groups/i)).toBeInTheDocument();
  });
});
