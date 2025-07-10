
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUsers, faMoneyBillTrendUp, faList, faGear, faHome } from '@fortawesome/free-solid-svg-icons';
import { FaBars, FaTimes } from 'react-icons/fa';
import './index.css';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      {/* Show hamburger when sidebar is closed */}
      {!isOpen && (
        <button className="hamburger" onClick={toggleSidebar}>
          <FaBars />
        </button>
      )}

      {/* Show close icon when sidebar is open */}
      {isOpen && (
        <button className="close-btn" onClick={toggleSidebar}>
          <FaTimes />
        </button>
      )}

      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <ul className="navigation">
          <li>
            <NavLink to="/home" className="nav-link" onClick={closeSidebar}>
              <span className="nav-icon"><FontAwesomeIcon icon={faHome} /></span>
              <span className="nav-label">Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/orders" className="nav-link" onClick={closeSidebar}>
              <span className="nav-icon"><FontAwesomeIcon icon={faList} /></span>
              <span className="nav-label">Orders</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/vendors" className="nav-link" onClick={closeSidebar}>
              <span className="nav-icon"><FontAwesomeIcon icon={faUser} /></span>
              <span className="nav-label">Vendors</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/customers" className="nav-link" onClick={closeSidebar}>
              <span className="nav-icon"><FontAwesomeIcon icon={faUsers} /></span>
              <span className="nav-label">Customers</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/sales" className="nav-link" onClick={closeSidebar}>
              <span className="nav-icon"><FontAwesomeIcon icon={faMoneyBillTrendUp} /></span>
              <span className="nav-label">Sales</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/settings" className="nav-link" onClick={closeSidebar}>
              <span className="nav-icon"><FontAwesomeIcon icon={faGear} /></span>
              <span className="nav-label">Settings</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
