
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faUsers, faList, faGear, faHome } from '@fortawesome/free-solid-svg-icons';
import { FaBars, FaTimes } from 'react-icons/fa';
import './index.css';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      {!isOpen && (
        <button className="hamburger" onClick={toggleSidebar} aria-label="Open menu">
          <FaBars />
        </button>
      )}

      {isOpen && (
        <button className="close-btn" onClick={toggleSidebar} aria-label="Close menu">
          <FaTimes />
        </button>
      )}


      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <img src='/Images/logohaba.png' id='habaLogo' alt='Haba Logo'/>
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
            <NavLink to="/users" className="nav-link" onClick={closeSidebar}>
              <span className="nav-icon"><FontAwesomeIcon icon={faUsers} /></span>
              <span className="nav-label">Users</span>
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
