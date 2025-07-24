import React from 'react';
import { render, screen } from '@testing-library/react';
import * as hookModule from '../orders/hooks/usefetchorders';
import Orders from './index';
import {useFetchOrders} from '../orders/hooks/usefetchorders';
import '@testing-library/jest-dom';



jest.mock('../orders/hooks/usefetchorders', () => ({
 useFetchOrders: jest.fn(),
}));


describe('Orders Component', () => {
 beforeEach(() => {
   jest.resetAllMocks();
 });


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
 });








