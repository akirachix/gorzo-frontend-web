import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import VendorPerformance from ".";

const mockUseFetchVendorPerformance = jest.fn();

jest.mock("../../../hooks/useFetchVendorPerformance", () => () => mockUseFetchVendorPerformance());

describe("VendorPerformance", () => {
  beforeEach(() => {
    mockUseFetchVendorPerformance.mockReturnValue({
      vendors: [
        { id: 1, first_name: "Alice", last_name: "Wambui" },
        { id: 2, first_name: "John", last_name: "Kamau" },
      ],
      products: [
        { vendor: 1, product_name: "Kales" },
        { vendor: 1, product_name: "Onions" },
        { vendor: 2, product_name: "Cabbages" },
      ],
      loading: false,
      error: null,
    });
  });

  it("renders the vendor performance table correctly", () => {
    render(<VendorPerformance />);

    expect(screen.getByText(/Vendor Performance/i)).toBeInTheDocument();
    expect(screen.getByText("Alice Wambui")).toBeInTheDocument();
    expect(screen.getByText("John Kamau")).toBeInTheDocument();
    expect(screen.getByText("Kales")).toBeInTheDocument();
    expect(screen.getByText("Cabbages")).toBeInTheDocument();
  });

  it("filters vendors by search query", () => {
    render(<VendorPerformance />);

    const input = screen.getByPlaceholderText(/Search vendors/i);
    fireEvent.change(input, { target: { value: "Alice" } });

    expect(screen.getByText("Alice Wambui")).toBeInTheDocument();
    expect(screen.queryByText("John Kamau")).toBeNull();
  });

  it("displays 'Vendor not found' for unmatched search", () => {
    render(<VendorPerformance />);

    const input = screen.getByPlaceholderText(/Search vendors/i);
    fireEvent.change(input, { target: { value: "Zach" } });

    expect(screen.getByText(/Vendor not found/i)).toBeInTheDocument();
  });

  it("shows loading message when loading is true", () => {
    mockUseFetchVendorPerformance.mockReturnValue({
      vendors: [],
      products: [],
      loading: true,
      error: null,
    });

    render(<VendorPerformance />);

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  it("shows error message when error is present", () => {
    mockUseFetchVendorPerformance.mockReturnValue({
      vendors: [],
      products: [],
      loading: false,
      error: { message: "Failed to fetch" },
    });

    render(<VendorPerformance />);

    expect(screen.getByText(/Error loading vendor performance/i)).toBeInTheDocument();
  });

it("handles pagination controls correctly", () => {
  const manyVendors = [];
  for (let i = 1; i <= 15; i++) {
    const numStr = i.toString().padStart(2, "0"); // '01', '02', ..., '15'
    manyVendors.push({ id: i, first_name: `Vendor${numStr}`, last_name: "Test" });
  }

  const products = manyVendors.map((v) => ({
    vendor: v.id,
    product_name: `Product${v.id}`,
  }));

  mockUseFetchVendorPerformance.mockReturnValue({
    vendors: manyVendors,
    products,
    loading: false,
    error: null,
  });

  render(<VendorPerformance />);

  expect(screen.getByText("Vendor01 Test")).toBeInTheDocument();
  expect(screen.getByText("Vendor10 Test")).toBeInTheDocument();
  expect(screen.queryByText("Vendor11 Test")).toBeNull();

  fireEvent.click(screen.getByText(/Next/i));

  expect(screen.getByText("Vendor11 Test")).toBeInTheDocument();
  expect(screen.getByText("Vendor15 Test")).toBeInTheDocument();
  expect(screen.queryByText("Vendor01 Test")).toBeNull();
  fireEvent.click(screen.getByText(/Previous/i));

  expect(screen.getByText("Vendor01 Test")).toBeInTheDocument();
  expect(screen.queryByText("Vendor11 Test")).toBeNull();
});

});
