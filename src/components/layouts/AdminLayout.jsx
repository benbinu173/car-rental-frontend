// src/layouts/AdminLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../AdminSidebar";

const AdminLayout = () => {
  return (
    <div className="d-flex">
      <AdminSidebar />
      <div className="flex-grow-1 p-4" style={{ marginLeft: "250px" }}>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
