import React from 'react';
import './index.css';
const dummyUsers = [
  { id: 1, name: 'Mama Aisha', type: 'Vendor', date: '2024/08/19', status: 'Active' },
  { id: 2, name: 'Derick', type: 'Customer', date: '2024/08/19', status: 'Active' },
  { id: 3, name: 'Mama Aisha', type: 'Customer', date: '2024/08/19', status: 'Active' },
  { id: 4, name: 'Derick', type: 'Customer', date: '2024/08/19', status: 'Active' },
  { id: 5, name: 'Mama Aisha', type: 'Vendor', date: '2024/08/19', status: 'Active' },
  { id: 6, name: 'Derick', type: 'Vendor', date: '2024/08/19', status: 'Active' },
  { id: 7, name: 'Mama Aisha', type: 'Vendor', date: '2024/08/19', status: 'Active' },
];

export default function TopCards() {
  return (
    <div>
    <div className="topcards-container">
      <div className="topcard">
        <p className="topcard-title">Active Mamabogas</p>
        <p className="topcard-number">1234</p>
      </div>
      <div className="topcard">
        <p className="topcard-title">Active Customers</p>
        <p className="topcard-number">1234</p>
      </div>
    </div>

    <div className="users-container">
      <h2 className="users-title">Users</h2>
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
          {dummyUsers.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.type}</td>
              <td>{user.date}</td>
              <td className="status-active">{user.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
}