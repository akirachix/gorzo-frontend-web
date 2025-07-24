import { useState, useEffect } from 'react';
import { fetchUsers } from '../utils/fetchVendorPerformance';

export const useUsers = (searchQuery = '', page = 1, limit = 10) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalVendors, setTotalVendors] = useState(0); 
  const [totalCustomers, setTotalCustomers] = useState(0); 
  const fetchUser = async () => {
    try {
      setLoading(true);
      const response = await fetchUsers();
      const vendors = response.filter(user => user && typeof user === 'object' && user.role === 'vendor').length;
      const customers = response.filter(user => user && typeof user === 'object' && user.role === 'customer').length;
      setTotalVendors(vendors);
      setTotalCustomers(customers);

      const roles = [...new Set(response
        .filter(user => user && typeof user === 'object' && user.role && typeof user.role === 'string')
        .map(user => user.role.toLowerCase())
      )];
      let filtered = response;

      if (searchQuery) {
        const lowerQuery = searchQuery.toLowerCase().trim();
        filtered = response.filter((user) => {
          if (!user || typeof user !== 'object') {
            return false;
          }
          const role = user.role && typeof user.role === 'string'
            ? user.role.toLowerCase()
            : '';
          const firstName = user.first_name && typeof user.first_name === 'string'
            ? user.first_name.toLowerCase()
            : '';
          const isActive = user.is_active !== undefined ? user.is_active
            : user.isActive !== undefined ? user.isActive
            : user.active !== undefined ? user.active
            : undefined;
          console.log('Processing User:', {
            id: user.id,
            firstName,
            role,
            isActive,
            query: lowerQuery,
            rawIsActive: user.is_active,
            rawIsActiveAlt: user.isActive,
            rawActive: user.active
          });

          if (lowerQuery === 'active') {
            return isActive === true;
          } else if (lowerQuery === 'inactive') {
            return isActive === false;
          } else if (roles.includes(lowerQuery)) {
            return role === lowerQuery;
          } else {
            return firstName.startsWith(lowerQuery);
          }
        });
      }
      setTotalUsers(filtered.length);
      const start = (page - 1) * limit;
      const paginated = filtered.slice(start, start + limit);
      setUsers(paginated);
    } catch (error) {
      setError(error.message ?? 'An Error Occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [searchQuery, page, limit]);

  return { loading, error, users, totalUsers, totalVendors, totalCustomers };
};