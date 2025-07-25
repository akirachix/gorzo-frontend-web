import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Users from '.';
import { useUsers } from '../hooks/useUsers';


jest.mock('../hooks/useUsers');

describe('Users Component', () => {

  beforeEach(() => {
    useUsers.mockReturnValue({
      users: [
        {
          id: 1,
          first_name: 'John Doe',
          role: 'Customer',
          address: { address: '123 Main St' },
          is_active: true,
        },
        {
          id: 2,
          first_name: 'Jane Smith',
          role: 'Vendor',
          address: { address: '456 Oak Ave' },
          is_active: false,
        },
      ],
      loading: false,
      error: null,
      totalUsers: 2,
      totalVendors: 1,
      totalCustomers: 1,
    });
  });


  afterEach(() => {
    jest.clearAllMocks();
  });


  test('shows the user details with names, roles, addresses, and status', () => {
    render(<Users />);

    expect(screen.getByText('Users')).toBeInTheDocument();

   
    const topcards = screen.getAllByText('1', { selector: '.topcard-number' });
    expect(topcards).toHaveLength(2); 
    expect(topcards[0]).toHaveTextContent('1');
    expect(topcards[1]).toHaveTextContent('1'); 


    expect(screen.getByText('#')).toBeInTheDocument();
    expect(screen.getByText('User')).toBeInTheDocument();
    expect(screen.getByText('User Type')).toBeInTheDocument();
    expect(screen.getByText('Address')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();


    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Customer')).toBeInTheDocument();
    expect(screen.getByText('123 Main St')).toBeInTheDocument();
    expect(screen.getByText('Active')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('Vendor')).toBeInTheDocument();
    expect(screen.getByText('456 Oak Ave')).toBeInTheDocument();
    expect(screen.getByText('Inactive')).toBeInTheDocument();
  });

  
  test('shows a loading message when loading is true', () => {
    useUsers.mockReturnValue({
      users: [],
      loading: true,
      error: null,
      totalUsers: 0,
      totalVendors: 0,
      totalCustomers: 0,
    });

    render(<Users />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.queryByText('No users found')).not.toBeInTheDocument();
    expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
  });


  test('shows an error message when api fails', () => {
    useUsers.mockReturnValue({
      users: [],
      loading: false,
      error: 'Failed to fetch users',
      totalUsers: 0,
      totalVendors: 0,
      totalCustomers: 0,
    });

    render(<Users />);

    expect(screen.getByText('Failed to fetch users')).toBeInTheDocument();
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    expect(screen.queryByText('No users found')).not.toBeInTheDocument();
  });

  test('filters users during search', async () => {
    const { rerender } = render(<Users />);

 
    const searchInput = screen.getByPlaceholderText('Search users by name or role');
    fireEvent.change(searchInput, { target: { value: 'John' } });

   
    useUsers.mockReturnValue({
      users: [
        {
          id: 1,
          first_name: 'John Smith',
          role: 'Customer',
          address: { address: '123 Main St' },
          is_active: true,
        },
      ],
      loading: false,
      error: null,
      totalUsers: 1,
      totalVendors: 0,
      totalCustomers: 1,
    });


    rerender(<Users />);

 
    await waitFor(() => {
      const johnDoeElements = screen.getAllByText('John Smith');
      expect(johnDoeElements).toHaveLength(1);
      expect(johnDoeElements[0]).toBeInTheDocument();
      expect(screen.getByText('Customer')).toBeInTheDocument();
      expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument();
    });
  });


  test('shows zero vendors and customers when no user data is available', () => {
    useUsers.mockReturnValue({
      users: [],
      loading: false,
      error: null,
      totalUsers: 0,
      totalVendors: 0,
      totalCustomers: 0,
    });

    render(<Users />);

    const topcards = screen.getAllByText('0', { selector: '.topcard-number' });
    expect(topcards).toHaveLength(2);
    expect(topcards[0]).toHaveTextContent('0'); 
    expect(topcards[1]).toHaveTextContent('0'); 
  });


  describe('Pagination', () => {
    test('shows pagination controls and allows switching pages', () => {
      useUsers.mockReturnValue({
        users: [
          {
            id: 1,
            first_name: 'John Doe',
            role: 'Customer',
            address: { address: '123 Main St' },
            is_active: true,
          },
        ],
        loading: false,
        error: null,
        totalUsers: 20, 
        totalVendors: 1,
        totalCustomers: 1,
      });

      const { rerender } = render(<Users />);

     
      expect(screen.getByText('Page 1 of 2')).toBeInTheDocument();
      const previousButton = screen.getByText('Previous');
      const nextButton = screen.getByText('Next');

   
      expect(previousButton).toBeDisabled();
      expect(nextButton).not.toBeDisabled();

 
      fireEvent.click(nextButton);

  
      useUsers.mockReturnValue({
        users: [
          {
            id: 11,
            first_name: 'Page Two User',
            role: 'Vendor',
            address: { address: '789 Pine Rd' },
            is_active: false,
          },
        ],
        loading: false,
        error: null,
        totalUsers: 20,
        totalVendors: 1,
        totalCustomers: 1,
      });

      rerender(<Users />);

      expect(screen.getByText('Page 2 of 2')).toBeInTheDocument();
      expect(nextButton).toBeDisabled();
      expect(previousButton).not.toBeDisabled();
    });

 
    test('hides pagination buttons when no users match the search', async () => {
      render(<Users />);

   
      useUsers.mockReturnValue({
        users: [],
        loading: false,
        error: null,
        totalUsers: 0,
        totalVendors: 0,
        totalCustomers: 0,
      });

  
      const searchInput = screen.getByPlaceholderText('Search users by name or role');
      fireEvent.change(searchInput, { target: { value: 'nonexistent' } });


      await waitFor(() => {
        expect(screen.getByText('No users found for "nonexistent"')).toBeInTheDocument();
        expect(screen.queryByText('Page')).not.toBeInTheDocument();
        expect(screen.queryByText('Previous')).not.toBeInTheDocument();
        expect(screen.queryByText('Next')).not.toBeInTheDocument();
      });

      expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
    });
  });
});



