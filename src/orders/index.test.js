import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import Orders from '.';
jest.mock('../hooks/usefetchorders', () => ({
  useFetchOrders: jest.fn(),
  useFetchGroups: jest.fn(),
}));
jest.mock('react-icons/fa', () => ({
  FaSearch: () => <span data-testid="search-icon" />,
}));
import { useFetchOrders, useFetchGroups } from '../hooks/usefetchorders';
describe('Orders component', () => {
  const mockOrders = [
    {
      order_id: '1',
      order_type: 'Individual',
      total_amount: 100,
      order_status: 'Picked',
      created_at: '2023-07-25T10:15:00.000Z',
    },
    {
      order_id: '2',
      order_type: 'Group',
      total_amount: 200,
      order_status: 'Pending',
      created_at: '2023-07-24T12:00:00.000Z',
    },
    {
      order_id: '3',
      order_type: 'Individual',
      total_amount: 150,
      order_status: 'Cancelled',
      created_at: '2023-07-23T14:30:00.000Z',
    },
  ];
  const mockGroups = [
    {
      liveGroup_id: '101',
      group_name: 'Group A',
      start_time: '2023-07-20T08:00:00.000Z',
    },
    {
      liveGroup_id: '102',
      group_name: 'Group B',
      start_time: '2023-07-22T09:30:00.000Z',
    },
  ];
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('renders groups and pie chart with correct legend labels', () => {
    useFetchOrders.mockReturnValue({ orders: mockOrders, loading: false, error: null });
    useFetchGroups.mockReturnValue({ groups: mockGroups, loading: false, error: null });
    render(<Orders />);
    expect(screen.getByText('Active Groups')).toBeInTheDocument();
    expect(screen.getByText('Group A')).toBeInTheDocument();
    expect(screen.getByText('Group B')).toBeInTheDocument();
    expect(screen.getByText(/Individual orders/i)).toBeInTheDocument();
    expect(screen.getByText(/Group orders/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Search orders by type or date/i)).toBeInTheDocument();
  });
  it('renders paginated orders and applies correct status classes', () => {
    useFetchOrders.mockReturnValue({ orders: mockOrders, loading: false, error: null });
    useFetchGroups.mockReturnValue({ groups: mockGroups, loading: false, error: null });
    render(<Orders />);
    mockOrders.forEach((order) => {
      const orderRow = screen.getByTestId(`order-row-${order.order_id}`);
  
      expect(within(orderRow).getByText(order.order_type)).toBeInTheDocument();
      expect(within(orderRow).getByText(order.total_amount.toString())).toBeInTheDocument();
      expect(within(orderRow).getByText(order.order_status)).toBeInTheDocument();
      expect(within(orderRow).getByText(order.created_at.split('T')[0])).toBeInTheDocument();
  
      const statusElement = within(orderRow).getByText(order.order_status);
      switch(order.order_status.toLowerCase()) {
        case 'picked':
          expect(statusElement.className).toMatch(/status-completed/);
          break;
        case 'pending':
          expect(statusElement.className).toMatch(/status-pending/);
          break;
        case 'cancelled':
          expect(statusElement.className).toMatch(/status-cancelled/);
          break;
        case 'packed':
          expect(statusElement.className).toMatch(/status-processing/);
          break;
        default:
          expect(statusElement.className).toMatch(/status-default/);
      }
    });
  });
  it('filters orders based on search input', () => {
    useFetchOrders.mockReturnValue({ orders: mockOrders, loading: false, error: null });
    useFetchGroups.mockReturnValue({ groups: mockGroups, loading: false, error: null });
    render(<Orders />);
    const input = screen.getByPlaceholderText(/Search orders by type or date/i);
    fireEvent.change(input, { target: { value: 'group' } });

    expect(screen.getAllByText('Group').length).toBeGreaterThan(0);

    mockOrders
      .filter(o => o.order_type.toLowerCase() === 'individual')
      .forEach(order =>
        expect(screen.queryByTestId(`order-row-${order.order_id}`)).toBeNull()
      );
  });
  it('pagination buttons work and disable appropriately', () => {
 
    const manyOrders = Array(20).fill(null).map((_, idx) => ({
      order_id: String(idx + 1),
      order_type: idx % 2 === 0 ? 'Individual' : 'Group',
      total_amount: 50 + idx,
      order_status: 'Pending',
      created_at: '2023-07-20T10:00:00.000Z',
    }));
    useFetchOrders.mockReturnValue({ orders: manyOrders, loading: false, error: null });
    useFetchGroups.mockReturnValue({ groups: mockGroups, loading: false, error: null });
    render(<Orders />);
    const prevButton = screen.getByText('Previous');
    const nextButton = screen.getByText('Next');
    const pageInfo = () => screen.getByText(/Page \d+ of \d+/i);

    expect(prevButton).toBeDisabled();
    expect(nextButton).not.toBeDisabled();
    expect(pageInfo().textContent).toMatch(/Page 1 of 3/);
    fireEvent.click(nextButton);
    expect(prevButton).not.toBeDisabled();
    expect(nextButton).not.toBeDisabled();
    expect(pageInfo().textContent).toMatch(/Page 2 of 3/);
    fireEvent.click(nextButton);
    expect(prevButton).not.toBeDisabled();
    expect(nextButton).toBeDisabled();
    expect(pageInfo().textContent).toMatch(/Page 3 of 3/);
    fireEvent.click(prevButton);
    expect(prevButton).not.toBeDisabled();
    expect(nextButton).not.toBeDisabled();
    expect(pageInfo().textContent).toMatch(/Page 2 of 3/);
  });
});