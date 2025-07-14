import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import VendorPerformance from '.';

beforeEach(() => {
  global.fetch = jest.fn((url) => {
    if (url.includes('users')) {
      return Promise.resolve({
        json: () => Promise.resolve([
          { user_id: 1, first_name: 'Jane', last_name: 'Doe', role: 'vendor' },
          { user_id: 2, first_name: 'John', last_name: 'Smith', role: 'customer' },
        ])
      });
    }
    if (url.includes('products')) {
      return Promise.resolve({
        json: () => Promise.resolve([
          { product_id: 10, vendor: 1, product_name: 'Tomatoes' },
          { product_id: 11, vendor: 1, product_name: 'Onions' },
        ])
      });
    }
    return Promise.reject(new Error('not found'));
  });
});

afterEach(() => {
  jest.resetAllMocks();
});

test('renders vendor table with correct data', async () => {
  render(<VendorPerformance />);
  
  expect(screen.getByText(/loading/i)).toBeInTheDocument();

  await waitFor(() => expect(screen.queryByText(/loading/i)).not.toBeInTheDocument());
  
  expect(screen.getByText('Jane Doe')).toBeInTheDocument();
  expect(screen.queryByText('John Smith')).not.toBeInTheDocument();

  expect(screen.getByText('2')).toBeInTheDocument(); 
  expect(screen.getByText('Tomatoes')).toBeInTheDocument(); 

  expect(screen.getByText('0')).toBeInTheDocument();
});

test('filters vendors via search', async () => {
  render(<VendorPerformance />);
  await waitFor(() => expect(screen.queryByText(/loading/i)).not.toBeInTheDocument());

  const search = screen.getByPlaceholderText(/search vendors/i);
  fireEvent.change(search, { target: { value: 'Jane' } });
  expect(screen.getByText('Jane Doe')).toBeInTheDocument();

  fireEvent.change(search, { target: { value: 'Nonexistent' } });
  expect(screen.queryByText('Jane Doe')).not.toBeInTheDocument();
});