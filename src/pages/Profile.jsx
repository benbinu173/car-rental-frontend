import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState({ name: "", email: "", phone: "", profileImage: "" });
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // To handle errors
  const token = sessionStorage.getItem("token");
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("https://car-rental-backend-pj3k.onrender.com/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser({
          name: res.data.name || "",
          email: res.data.email || "",
          phone: res.data.phone || "",
          profileImage: res.data.profileImage || "",
        });
      } catch (error) {
        console.error("Failed to fetch profile:", error);
        setError("Failed to load profile data.");
      } finally {
        setLoading(false);
      }
    };

    const fetchBookings = async () => {
      try {
        const response = await axios.get("https://car-rental-backend-pj3k.onrender.com/api/bookings/my-bookings", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBookings(response.data);
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
        setError("Failed to load bookings.");
      }
    };

    if (token) {
      fetchProfile();
      fetchBookings();
    } else {
      setError("No valid session token found.");
      setLoading(false);
    }
  }, [token]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", user.name); // 👈 matches your state and backend field
    formData.append("phone", user.phone);
    if (selectedImage) {
      formData.append("profileImage", selectedImage);
    }

    try {
      await axios.put("https://car-rental-backend-pj3k.onrender.com/api/user/profile", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Profile updated successfully!");
      setUser(prev => ({ ...prev, profileImage: previewImage || prev.profileImage })); // Optimistically update UI
    } catch (error) {
      console.error("Failed to update profile:", error);
      alert("Update failed.");
    }
  };

  if (loading) return <div className="text-center mt-5">Loading profile...</div>;

  if (error) return <div className="text-center mt-5 text-danger">{error}</div>;

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow p-4">
            <h2 className="text-center mb-4">My Profile</h2>
            <div className="text-center">
              <img
                src={
                  previewImage ||
                  (user.profileImage
                    ? `https://car-rental-backend-pj3k.onrender.com/uploads/${user.profileImage}`
                    : "/images/user-placeholder.jpg")
                }
                alt="Profile"
                className="profile-img mb-2"
                style={{ width: "120px", height: "120px", borderRadius: "50%", objectFit: "cover" }}
              />
              <div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="form-control mt-2"
                />
              </div>
            </div>

            <form className="mt-4" onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input type="email" name="email" value={user.email} className="form-control" disabled />
              </div>
              <div className="mb-3">
                <label className="form-label">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={user.phone}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter your phone number"
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Update Profile
              </button>
            </form>
          </div>

          <div className="card shadow p-4 mt-4">
            <h3 className="mb-3">My Bookings</h3>
            {bookings.length === 0 ? (
              <p>No bookings found.</p>
            ) : (
              <ul className="list-group">
                {bookings.map((booking) => (
                  <li key={booking._id} className="list-group-item">
                    <strong>{booking.carName}</strong> - {booking.startDate.slice(0, 10)} to{" "}
                    {booking.endDate.slice(0, 10)} - ₹{booking.pricePerDay}/day
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
