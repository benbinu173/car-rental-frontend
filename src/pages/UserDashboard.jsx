import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"; //  useNavigate for redirect

const UserDashboard = () => {
  const [user, setUser] = useState({});
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate(); // 🔥

  const fetchDashboardData = async () => {
    const token = sessionStorage.getItem("token");
    if (!token) return; // optionally redirect to login

    try {
      console.log("Fetching user profile...");
      const { data: userData } = await axios.get("https://car-rental-backend-iy1d.onrender.com/api/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("User Data:", userData);
      setUser(userData);

      console.log("Fetching bookings...");
      const { data: bookingsData } = await axios.get("https://car-rental-backend-iy1d.onrender.com/api/bookings/user/bookings", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Bookings Data:", bookingsData);
      setBookings(bookingsData);
    } catch (error) {
      console.error("Dashboard loading error:", error);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // ✅ Logout function
  const handleLogout = () => {
    sessionStorage.removeItem("token"); // Clear token
    alert("You have been logged out successfully!"); // Show alert
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="container mt-5">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3">
          <div className="user-sidebar p-3">
            <h4>User Panel</h4>
            <ul className="list-group">
              <li className="list-group-item active">Dashboard</li>
              <li className="list-group-item">
                <Link to="/profile">Profile</Link>
              </li>
              {/* ✅ Logout Button */}
              <li className="list-group-item">
                <button onClick={handleLogout} className="btn btn-danger w-100">
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Main Dashboard */}
        <div className="col-md-9">
          <h2>Welcome, {user.name || "User"}!</h2>

          {/* Booking List */}
          <h3 className="mt-4">My Bookings</h3>
          <table className="table table-striped mt-3">
            <thead>
              <tr>
                <th>#</th>
                <th>Car</th>
                <th>Pickup Date</th>
                <th>Return Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length > 0 ? (
                bookings.map((booking, index) => (
                  <tr key={booking._id}>
                    <td>{index + 1}</td>
                    <td>{booking.car?.model || "Unknown"}</td>
                    <td>{new Date(booking.startDate).toLocaleDateString()}</td>
                    <td>{new Date(booking.endDate).toLocaleDateString()}</td>
                    <td>
                      <span className={`badge bg-${booking.status === "Approved" ? "success" : "secondary"}`}>
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">No bookings found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
