import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaCar, FaUser, FaSignOutAlt } from "react-icons/fa";
import "../styles/UserSidebar.css"; // Add custom styles

const UserSidebar = () => {
  return (
    <div className="user-sidebar">
      <h2 className="sidebar-title">Dashboard</h2>
      <ul className="sidebar-menu">
        <li>
          <Link to="/dashboard">
            <FaHome className="sidebar-icon" /> Home
          </Link>
        </li>
        <li>
          <Link to="/my-bookings">
            <FaCar className="sidebar-icon" /> My Bookings
          </Link>
        </li>
        <li>
          <Link to="/profile">
            <FaUser className="sidebar-icon" /> Profile
          </Link>
        </li>
        <li>
          <Link to="/logout">
            <FaSignOutAlt className="sidebar-icon" /> Logout
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default UserSidebar;
