import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [stats, setStats] = useState({ userCount: 0, carCount: 0, bookingCount: 0 });
  const [recentBookings, setRecentBookings] = useState([]);
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("https://car-rental-backend-pj3k.onrender.com/api/admin/stats", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStats(res.data);
      } catch (err) {
        console.error("Failed to fetch stats", err);
      }
    };

    const fetchRecentBookings = async () => {
      try {
        const res = await axios.get("https://car-rental-backend-pj3k.onrender.com/api/admin/recent-bookings", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRecentBookings(res.data);
      } catch (err) {
        console.error("Failed to fetch recent bookings", err);
      }
    };

    fetchStats();
    fetchRecentBookings();
  }, [token]);

  // Inline CSS Styles
  const dashboardCardStyle = {
    backgroundColor: "#2c3e50",
    color: "#ecf0f1",
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
    margin: "10px 0",
  };

  const cardTitleStyle = {
    fontSize: "1.2rem",
    fontWeight: "600",
    marginBottom: "15px",
    color: "#ecf0f1",
  };

  const statsTextStyle = {
    fontSize: "2rem",
    fontWeight: "700",
    color: "#3498db",
  };

  const recentBookingCardStyle = {
    backgroundColor: "#34495e",
    color: "#ecf0f1",
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
  };

  const recentBookingListStyle = {
    listStyleType: "none",
    paddingLeft: "0",
  };

  const recentBookingItemStyle = {
    backgroundColor: "#16a085",
    marginBottom: "10px",
    padding: "10px",
    borderRadius: "5px",
    color: "#fff",
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4" style={{ color: "#2c3e50", fontWeight: "700" }}>
        Admin Dashboard
      </h2>

      <div className="row">
        <div className="col-md-4">
          <div style={dashboardCardStyle}>
            <h5 style={cardTitleStyle}>Total Users</h5>
            <p style={statsTextStyle}>{stats.userCount}</p>
          </div>
        </div>
        <div className="col-md-4">
          <div style={dashboardCardStyle}>
            <h5 style={cardTitleStyle}>Total Cars</h5>
            <p style={statsTextStyle}>{stats.carCount}</p>
          </div>
        </div>
        <div className="col-md-4">
          <div style={dashboardCardStyle}>
            <h5 style={cardTitleStyle}>Total Bookings</h5>
            <p style={statsTextStyle}>{stats.bookingCount}</p>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-6">
          <div style={recentBookingCardStyle}>
            <h5 style={cardTitleStyle}>Recent Bookings</h5>
            {recentBookings.length === 0 ? (
              <p>No recent bookings found.</p>
            ) : (
              <ul style={recentBookingListStyle}>
                {recentBookings.map((booking) => (
                  <li key={booking._id} style={recentBookingItemStyle}>
                    {booking.user?.name || "Unknown User"} - {booking.carName}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="col-md-6">
          <div style={recentBookingCardStyle}>
            <h5 style={cardTitleStyle}>Manage Users</h5>
            <p>Coming soon...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
