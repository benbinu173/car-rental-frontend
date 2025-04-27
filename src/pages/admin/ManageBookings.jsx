import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all bookings
  const fetchBookings = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.get("https://car-rental-backend-pj3k.onrender.com/api/admin/bookings", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Bookings response:", response.data); // Debug

      // If response is { bookings: [...] }
      if (Array.isArray(response.data)) {
        setBookings(response.data);
      } else if (Array.isArray(response.data.bookings)) {
        setBookings(response.data.bookings);
      } else {
        setBookings([]); // fallback
        toast.error("Unexpected response format");
      }
    } catch (error) {
      toast.error("Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  // Delete a booking
  const deleteBooking = async (id) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      try {
        const token = sessionStorage.getItem("token");
        await axios.delete(`https://car-rental-backend-pj3k.onrender.com/api/admin/bookings/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success("Booking deleted");
        fetchBookings();
      } catch (err) {
        toast.error("Failed to delete booking");
      }
    }
  };

  // Update booking status
  const updateStatus = async (id, status) => {
    try {
      const token = sessionStorage.getItem("token");
      await axios.put(
        `https://car-rental-backend-pj3k.onrender.com/api/admin/bookings/${id}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(`Booking ${status}`);
      fetchBookings();
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Manage Bookings</h2>

      {loading ? (
        <p>Loading bookings...</p>
      ) : Array.isArray(bookings) && bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>User</th>
                <th>Car</th>
                <th>From</th>
                <th>To</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <tr key={booking._id}>
                  <td>{index + 1}</td>
                  <td>{booking.user?.name || "Unknown"}</td>
                  <td>{booking.carName}</td>
                  <td>{new Date(booking.startDate).toLocaleDateString()}</td>
                  <td>{new Date(booking.endDate).toLocaleDateString()}</td>
                  <td>
                    <span
                      className={`badge bg-${
                        booking.status === "Approved"
                          ? "success"
                          : booking.status === "Cancelled"
                          ? "danger"
                          : "warning"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td>
                    {booking.status === "Pending" ? (
                      <>
                        <button
                          className="btn btn-success btn-sm me-2"
                          onClick={() => updateStatus(booking._id, "Approved")}
                        >
                          Approve
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => updateStatus(booking._id, "Cancelled")}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button className="btn btn-secondary btn-sm" disabled>
                        {booking.status}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageBookings;
