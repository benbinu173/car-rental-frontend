import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(`https://car-rental-backend-iy1d.onrender.com/api/admin/auth/login`, {
        email,
        password,
      });

      sessionStorage.setItem("token", res.data.token);
      sessionStorage.setItem("isAdmin", "true");

      navigate("/admin"); // Or your dashboard route
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  // Inline CSS
  const containerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f7f9fc", // Light background color for the page
  };

  const cardStyle = {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "8px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "400px",
    textAlign: "center",
    border: "1px solid #e0e0e0", // Subtle border around the card
  };

  const headerStyle = {
    fontSize: "1.8rem",
    fontWeight: "600",
    color: "#2c3e50", // Dark color for header
  };

  const formLabelStyle = {
    fontWeight: "500",
    color: "#2c3e50", // Dark color for labels
  };

  const inputStyle = {
    borderRadius: "5px",
    border: "1px solid #ccc",
    padding: "12px 15px",
    marginBottom: "15px",
    width: "100%",
    boxSizing: "border-box",
  };

  const buttonStyle = {
    backgroundColor: "#3498db", // Blue color for button
    color: "#fff",
    padding: "12px",
    border: "none",
    borderRadius: "5px",
    width: "100%",
    fontSize: "1rem",
    cursor: "pointer",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    transition: "background-color 0.3s ease",
  };

  const buttonHoverStyle = {
    backgroundColor: "#2980b9", // Darker blue on hover
  };

  const alertStyle = {
    backgroundColor: "#e74c3c", // Red background for error
    color: "#fff",
    padding: "10px",
    borderRadius: "5px",
    marginBottom: "15px",
    fontSize: "1rem",
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h3 style={headerStyle}>Admin Login</h3>
        {error && <div style={alertStyle}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label" style={formLabelStyle}>Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              style={inputStyle}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label" style={formLabelStyle}>Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
              style={inputStyle}
            />
          </div>
          <button
            type="submit"
            style={buttonStyle}
            onMouseOver={(e) => e.target.style.backgroundColor = buttonHoverStyle.backgroundColor}
            onMouseOut={(e) => e.target.style.backgroundColor = buttonStyle.backgroundColor}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
