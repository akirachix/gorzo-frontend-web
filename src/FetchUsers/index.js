import React from 'react';
import { useUsers } from '../hooks/useUsers';
import './style.css';

const UserDashboard = () => {
  const { users, loading, error } = useUsers();

  // const activeMamabogas = users.filter(user => user.role === 'Vendor' && user.status === 'Active');
  // const activeCustomers = users.filter(user => user.role === 'Customer' && user.status === 'Active');

  if (loading) {return <p className="loading">Loading...</p>;}
  if (error) {return <p className="error">Error loading users</p>;}

  return (
    <div className="dashboard-container">
      <div className="summary-cards">
        <div className="card">
          <h3>Active Mamabogas</h3>
          <span>{users.filter(user =>
            user.role ==='vendor'
          ).length}</span>
        </div>
        <div className="card">
          <h3>Active Customers</h3>
          <span>{users.filter(user =>
            user.role ==='vendor'
          ).length}</span>
        </div>
      </div>

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
          {users.map((user , index) => (
            <tr key={user.id || index}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.role}</td>
              <td>{user.registered_date}</td>
              <td>{user.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserDashboard;
