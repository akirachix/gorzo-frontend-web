import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faList, faHome, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FaBars, FaTimes } from 'react-icons/fa';
import './index.css';
import { signOut } from '../../utils/auth';
const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);
  const handleSignOut = () => {
    setIsModalOpen(true);
  };
  const confirmSignOut = () => {
    signOut();
    window.location.href = '/';
    setIsModalOpen(false);
  };
  const cancelSignOut = () => {
    setIsModalOpen(false);
  };
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
        <img src="/Images/logohaba.png" id="habaLogo" alt="Haba Logo" />
        <nav aria-label="Sidebar navigation">
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
              <button className="nav-link sign-out" onClick={handleSignOut}>
                <span className="nav-icon"><FontAwesomeIcon icon={faSignOutAlt} /></span>
                <span className="nav-label">Sign Out</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Confirm Sign Out</h2>
            <p>Are you sure you want to sign out?</p>
            <div className="modal-buttons">
              <button className="modal-button confirm" onClick={confirmSignOut}>Yes</button>
              <button className="modal-button cancel" onClick={cancelSignOut}>No</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Sidebar;
