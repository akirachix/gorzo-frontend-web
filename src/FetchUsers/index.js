import React, { useState } from 'react';
import { useUsers } from '../hooks/useUsers';
import { FaSearch } from 'react-icons/fa';
import './style.css';

const Users = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const limit = 10;
  const { users, loading, error, totalUsers, totalVendors, totalCustomers } = useUsers(searchQuery, page, limit);
  const totalPages = Math.ceil(totalUsers / limit);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setPage(1);
  };

  return (
    <div className="dashboard-container">
      <h1>Users</h1>
      <div className="topcards-container">
        <div className="topcard">
          <span className="topcard-number">{totalVendors}</span>
          <span className="topcard-title">Active Mamambogas</span>
        </div>
        <div className="topcard">
          <span className="topcard-number">{totalCustomers}</span>
          <span className="topcard-title">Active Customers</span>
        </div>
      </div>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search users by name or role"
          value={searchQuery}
          onChange={handleSearch}
          className="search-input"
        />
        <FaSearch className="search-icon" />
      </div>
      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && (
        <>
          <div className="table-wrapper">
            {users.length === 0 && searchQuery ? (
              <div className="no-results">No users found for "{searchQuery}"</div>
            ) : (
              <table className="users-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>User</th>
                    <th>User Type</th>
                    <th>Address</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={user.id || index}>
                      <td>{index+1}</td>
                      <td>{user.first_name|| 'N/A'}</td>
                      <td className={user.role === 'customer' ? 'customer' : user.role === 'vendor' ? 'vendor' : 'admin'}>
                        {user.role.charAt(0).toUpperCase()+ user.role.slice(1)|| 'N/A'}
                      </td>
                      <td>{user.address?.address || 'N/A'}</td>
                      <td className={user.is_active ? 'active' : 'inactive'}>
                        {user.is_active ? 'Active' : 'Inactive'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          {!(users.length === 0 && searchQuery) && (
            <div className="pagination-controls">
              <button
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                disabled={page === 1}
                className="secondary-button"
              >
                Previous
              </button>
              <span className="span">Page {page} of {totalPages}</span>
              <button
                onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                disabled={page === totalPages}
                className="primary-button"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Users;