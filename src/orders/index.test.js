import React from 'react';
import { render, screen } from '@testing-library/react';
import Orders from '.';
import { useFetchOrders } from '../hooks/usefetchorders';
import '@testing-library/jest-dom';



jest.mock('../hooks/usefetchorders', () => ({
 useFetchOrders: jest.fn(),
}));


describe('Orders Component', () => {
 beforeEach(() => {
   jest.resetAllMocks();
 });

 const mockOrders = [
  {
    order_id: 1,
    group_id: 'G1',
    order_type: 'Individual',
    total_amount: 450.0,
    created_at: '2025-07-20T10:30:00Z',
    order_status: 'picked',
  },
  {
    order_id: 2,
    group_id: 'G2',
    order_type: 'Group',
    total_amount: 150.0,
    created_at: '2025-07-19T14:45:00Z',
    order_status: 'pending',
  },
  {
    order_id: 3,
    group_id: 'G3',
    order_type: 'Individual',
    total_amount: 75.5,
    created_at: '2025-07-18T09:15:00Z',
    order_status: 'cancelled',
  },
  {
    order_id: 4,
    group_id: 'G4',
    order_type: 'Group',
    total_amount: 220.0,
    created_at: '2025-07-21T16:50:00Z',
    order_status: 'packed',
  },
  {
    order_id: 5,
    group_id: 'G5',
    order_type: 'Group',
    total_amount: 520.0,
    created_at: '2025-08-21T16:50:00Z',
    order_status: 'pending',
  },
  {
    order_id: 6,
    group_id: 'G6',
    order_type: 'Individual',
    total_amount: 620.0,
    created_at: '2025-09-21T16:50:00Z',
    order_status: 'picked',
  },
  {
    order_id: 7,
    group_id: 'G7',
    order_type: 'Group',
    total_amount: 520.0,
    created_at: '2025-10-01T16:50:00Z',
    order_status: 'pending',
  },
  {
    order_id: 8,
    group_id: 'G8',
    order_type: 'Individual',
    total_amount: 620.0,
    created_at: '2025-10-05T16:50:00Z',
    order_status: 'picked',
  },
  {
    order_id: 9,
    group_id: 'G9',
    order_type: 'Group',
    total_amount: 330.0,
    created_at: '2025-10-10T16:50:00Z',
    order_status: 'cancelled',
  }
];


 test('renders loading state', () => {
   useFetchOrders.mockReturnValue({ loading: true, error: null, orders: [] });
   render(<Orders />);
   expect(screen.getByText(/loading/i)).toBeInTheDocument();
 });

 

 test('renders error state', () => {
   useFetchOrders.mockReturnValue({ loading: false, error: 'Failed to fetch', orders: [] });
   render(<Orders />);
   expect(screen.getByText(/failed to fetch/i)).toBeInTheDocument();
 });
 
 test('renders pie chart with correct data', () => {
   const mockOrders = [
     { order_id: 1, order_type: 'individual', total_amount: '1000ksh', created_at: '2025-07-14T10:00:00Z' },
     { order_id: 2, order_type: 'group', total_amount: '2000ksh', created_at: '2025-07-15T10:00:00Z' },
     { order_id: 3, order_type: 'individual', total_amount: '500ksh', created_at: '2025-07-16T10:00:00Z' },
   ];
   useFetchOrders.mockReturnValue({ loading: false, error: null, orders: mockOrders });
   render(<Orders />);
   expect(screen.getByText(/individual orders/i)).toBeInTheDocument();
   expect(screen.getByText(/group orders/i)).toBeInTheDocument();

 

 });
   test('renders orders table with correct initial pagination', () => {
    useFetchOrders.mockReturnValue({ loading: false, error: null, orders: mockOrders })
    
 });

})
 



 






