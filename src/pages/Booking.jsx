import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Booking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    startDate: "",
    endDate: "",
  });

  // Fetch car details on component mount
   useEffect(() => {
     const fetchCar = async () => {
       try {
         const response = await axios.get(`https://car-rental-backend-pj3k.onrender.com/api/cars/${id}`);
 
         console.log("Fetched Car:", response.data);
 
         // Handle response based on possible formats
         if (response.data.car) {
           setCar(response.data.car); // if backend sends { car: { ... } }
         } else {
           setCar(response.data); // if backend sends just the car object
         }
       } catch (error) {
         console.error("Failed to fetch car details:", error);
       }
     };
 
     fetchCar();
   }, [id]); 

  // Handle form data changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        alert("You must be logged in to make a booking.");
        return;
      }
  
      const res = await axios.post(
        "https://car-rental-backend-pj3k.onrender.com/api/bookings/book",
        {
          car: car._id,
          pricePerDay: car.pricePerDay,
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          startDate: formData.startDate,
          endDate: formData.endDate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (res.status === 200 || res.status === 201) {
        alert("Booking Successful!");
        navigate("/");
      } else {
        alert("Booking failed with status: " + res.status);
      }
      
    } catch (err) {
      // Show the exact error message from the backend (if available)
      console.error("Error details:", err.response ? err.response.data : err);
      alert("Booking Failed. Please try again.");
    }
  };
  

  if (!car) return <p>Loading car details...</p>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Book {car.name}</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="fullName"
          placeholder="Your Full Name"
          value={formData.fullName}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Your Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="date"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Book Now
        </button>
      </form>
    </div>
  );
};

export default Booking;
