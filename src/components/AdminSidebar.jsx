import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaTachometerAlt,
  FaCar,
  FaUsers,
  FaClipboardList,
  FaChartBar,
  FaSignOutAlt, // Added logout icon
} from "react-icons/fa";

const AdminSidebar = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isOpen, setIsOpen] = useState(!isMobile);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setIsOpen(!mobile);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sidebarStyle = {
    width: isMobile ? "100%" : "250px",
    backgroundColor: "#343a40",
    color: "white",
    height: isMobile ? "auto" : "100vh",
    position: isMobile ? "relative" : "fixed",
    top: 0,
    left: 0,
    zIndex: 1000,
    padding: "15px",
  };

  const menuItemStyle = {
    display: "block",
    padding: "10px 15px",
    color: "white",
    textDecoration: "none",
    borderRadius: "4px",
    marginBottom: "8px",
  };

  const activeStyle = {
    backgroundColor: "#495057",
  };

  const toggleButtonStyle = {
    background: "none",
    border: "none",
    color: "white",
    fontSize: "1.5rem",
    marginBottom: "10px",
  };

  const handleLogout = () => {
    // Clear session or token
    sessionStorage.removeItem("token");

    // Redirect to login page
    navigate("/admin/login");
  };

  return (
    <div style={sidebarStyle}>
      {isMobile && (
        <button onClick={() => setIsOpen(!isOpen)} style={toggleButtonStyle}>
          <FaBars />
        </button>
      )}
      <h2 style={{ fontSize: "1.5rem", marginBottom: "20px" }}>Admin Panel</h2>
      {isOpen && (
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          <li>
            <NavLink
              to="/admin/dashboard"
              style={({ isActive }) =>
                isActive
                  ? { ...menuItemStyle, ...activeStyle }
                  : menuItemStyle
              }
            >
              <FaTachometerAlt style={{ marginRight: "10px" }} />
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/cars"
              style={({ isActive }) =>
                isActive
                  ? { ...menuItemStyle, ...activeStyle }
                  : menuItemStyle
              }
            >
              <FaCar style={{ marginRight: "10px" }} />
              Manage Cars
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/users"
              style={({ isActive }) =>
                isActive
                  ? { ...menuItemStyle, ...activeStyle }
                  : menuItemStyle
              }
            >
              <FaUsers style={{ marginRight: "10px" }} />
              Users
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/bookings"
              style={({ isActive }) =>
                isActive
                  ? { ...menuItemStyle, ...activeStyle }
                  : menuItemStyle
              }
            >
              <FaClipboardList style={{ marginRight: "10px" }} />
              Bookings
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/reports"
              style={({ isActive }) =>
                isActive
                  ? { ...menuItemStyle, ...activeStyle }
                  : menuItemStyle
              }
            >
              <FaChartBar style={{ marginRight: "10px" }} />
              Reports
            </NavLink>
          </li>
        </ul>
      )}
      {/* Logout Button */}
      <button
        onClick={handleLogout}
        style={{
          ...menuItemStyle,
          backgroundColor: "#dc3545",
          display: "block",
          marginTop: "auto",
        }}
      >
        <FaSignOutAlt style={{ marginRight: "10px" }} />
        Logout
      </button>
    </div>
  );
};

export default AdminSidebar;
