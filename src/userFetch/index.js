import React, { useEffect, useState } from 'react';
import './TopCards.css';

export default function TopCardsFetch() {
  const [vendorCount, setVendorCount] = useState(0);
  const [customerCount, setCustomerCount] = useState(0);
  const [users, setUsers] = useState([]);  

  useEffect(() => {
    fetch('https://corsproxy.io/?https://haba-58a6f125bb51.herokuapp.com/api/')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setUsers(data);
      
        const vendors = data.filter(user => user.role === 'vendor');
        const customers = data.filter(user => user.role === 'customer');
        setVendorCount(vendors.length);
        setCustomerCount(customers.length);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, []);


  return (
    <div>
      <div className="topcards-container">
        <div className="topcard">
          <p className="topcard-title">Active Mamabogas</p>
          <p className="topcard-number">{vendorCount}</p>
        </div>
        <div className="topcard">
          <p className="topcard-title">Active Customers</p>
          <p className="topcard-number">{customerCount}</p>
        </div>
      </div>
      <div className='users-container'>
        <h2 className="users-title">All Users</h2>
        <table className="users-table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Role</th>
              <th>Date</th>
              <th>Status</th>

            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.user_id}>
                <td>{user.user_id}</td>
                <td>{user.first_name} {user.last_name}</td>
                <td>{user.role}</td>
                <td>{new Date(user.sign_up_date).toLocaleDateString()}</td>
                  <td className="status-active">{user.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}