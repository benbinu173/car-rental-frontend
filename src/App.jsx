// App.jsx
import React from "react";
import {  Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import CarList from "./pages/CarList";
import CarDetails from "./pages/CarDetails";
import Booking from "./pages/Booking";
import UserDashboard from "./pages/UserDashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Contact from "./pages/Contact";
import About from "./pages/About";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageCars from "./pages/admin/ManageCars";
import ManageBookings from "./pages/admin/ManageBookings";
import ManageUsers from "./pages/admin/ManageUsers";
import Reports from "./pages/admin/Reports";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./components/layouts/AdminLayout"; // ✅ newly added

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Public/User Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/cars" element={<CarList />} />
        <Route path="/cars/:id" element={<CarDetails />} />
        <Route path="/booking/:id" element={<Booking />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />

        {/* Admin Login (No Sidebar/Layout) */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Admin Routes with Sidebar/Layout */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="cars" element={<ManageCars />} />
          <Route path="bookings" element={<ManageBookings />} />
          <Route path="users" element={<ManageUsers />} />
          <Route path="reports" element={<Reports />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
