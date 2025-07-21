import { useState, useEffect } from 'react';
import { fetchUsers } from '../utils/api';
export const useUsers = (searchQuery = '', page = 1, limit = 10) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalUsers, setTotalUsers] = useState(0);
  const fetchUser = async () => {
    try {
      setLoading(true);
      const response = await fetchUsers(); // Assuming fetchUsers() gets ALL users
      let filtered = response;
      // Filter by search query
      if (searchQuery) {
        filtered = filtered.filter(user =>
          user.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      setTotalUsers(filtered.length);
      // Paginate the filtered data
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
  return { loading, error, users, totalUsers };
};