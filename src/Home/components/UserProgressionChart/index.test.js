import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import CustomerProgressionChart from ".";



jest.mock("../../../hooks/useCustomerProgression", () => () => ({
  dataset: [
    { month: "June 2024", users: 2 },
    { month: "July 2024", users: 5 }
  ],
  loading: false,
  error: null
}));

describe("CustomerProgressionChart", () => {
  it("renders the chart with customer data", async () => {
    render(<CustomerProgressionChart />);

    expect(await screen.findByText(/new customers per month/i)).toBeInTheDocument();
    expect(screen.getByText(/June 2024/i)).toBeInTheDocument();
    expect(screen.getByText(/July 2024/i)).toBeInTheDocument();
  });
});
