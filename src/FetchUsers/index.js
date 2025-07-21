import React, { useState } from 'react';
import { useUsers } from '../hooks/useUsers';
import { FaSearch } from 'react-icons/fa';

import './style.css';
const UserDashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const limit = 15; 
  const { users, loading, error, totalUsers } = useUsers(searchQuery, page, limit);
  const totalPages = Math.ceil(totalUsers / limit);
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setPage(1);
  };
  return (
    <div className="dashboard-container">
         <div className="topcards-container">
        <div className="topcard">
          <h3>Active Mamabogas</h3>
          <span>{users.filter(user =>
            user.role ==='vendor'
          ).length}</span>
        </div>
        <div className="topcard">
          <h3>Active Customers</h3>
          <span>{users.filter(user =>
            user.role ==='vendor'
          ).length}</span>
        </div>
      </div>
      <div className='search-container'>
      <input
        type="text"
        placeholder="Search Users..."
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
          <table className="users-table">
            <thead>
              <tr>
                <th>#</th>
                <th>User</th>
                <th>User Type</th>
                <th>Registered Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id || index}>
                  <td>{(page - 1) * limit + index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.role}</td>
                  <td>{user.registered_date}</td>
                  <td>{user.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Pagination Controls */}
          <div className="pagination-controls">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              className='secondary-button'
            >
              Previous
            </button>
            <span className='span'>Page {page} of {totalPages}</span>
            <button
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page === totalPages}
              className='primary-button'
            >
              Next
            </button>

            
          </div>
        </>
      )}
    </div>
  );
};
export default UserDashboard;