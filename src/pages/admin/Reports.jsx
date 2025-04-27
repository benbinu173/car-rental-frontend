import React, { useEffect, useState } from "react";
import axios from "axios";

const Reports = () => {
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const res = await axios.get("https://car-rental-backend-pj3k.onrender.com/api/admin/reports", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setReportData(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch reports:", err);
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  if (loading) return <p className="text-center mt-5" style={{ color: "#343a40" }}>Loading reports...</p>;

  return (
    <div
      className="container mt-5"
      style={{
        backgroundColor: "#f7f7f7",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h2 className="text-center mb-4" style={{ color: "#2c3e50", fontWeight: "bold" }}>Reports</h2>

      <div className="row">
        <div className="col-md-4 col-sm-12 mb-3">
          <div
            className="card shadow p-4 text-center"
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "8px",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h5 style={{ color: "#3498db" }}>Total Revenue</h5>
            <p className="report-value" style={{ fontSize: "24px", color: "#2c3e50" }}>${reportData.totalRevenue}</p>
          </div>
        </div>
        <div className="col-md-4 col-sm-12 mb-3">
          <div
            className="card shadow p-4 text-center"
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "8px",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h5 style={{ color: "#e67e22" }}>Total Bookings</h5>
            <p className="report-value" style={{ fontSize: "24px", color: "#2c3e50" }}>{reportData.totalBookings}</p>
          </div>
        </div>
        <div className="col-md-4 col-sm-12 mb-3">
          <div
            className="card shadow p-4 text-center"
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "8px",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h5 style={{ color: "#2ecc71" }}>Total Users</h5>
            <p className="report-value" style={{ fontSize: "24px", color: "#2c3e50" }}>{reportData.totalUsers}</p>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-6 col-sm-12 mb-3">
          <div
            className="card shadow p-4"
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "8px",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h5 style={{ color: "#9b59b6" }}>Recent Transactions</h5>
            <ul className="list-group">
              {reportData.recentTransactions.map((tx, index) => (
                <li
                  className="list-group-item"
                  key={index}
                  style={{
                    borderBottom: "1px solid #ddd",
                    backgroundColor: "#f9f9f9",
                    padding: "10px 15px",
                  }}
                >
                  {tx.user} - ${tx.amount} - {tx.car}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="col-md-6 col-sm-12 mb-3">
          <div
            className="card shadow p-4"
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "8px",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h5 style={{ color: "#f39c12" }}>Most Booked Cars</h5>
            <ul className="list-group">
              {reportData.mostBookedCars.map((car, index) => (
                <li
                  className="list-group-item"
                  key={index}
                  style={{
                    borderBottom: "1px solid #ddd",
                    backgroundColor: "#f9f9f9",
                    padding: "10px 15px",
                  }}
                >
                  {car.car} - {car.count} Bookings
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
