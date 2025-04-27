import React, { useEffect, useState } from "react";
import axios from "axios";

const ManageCars = () => {
  const [cars, setCars] = useState([]);
  const [editingCar, setEditingCar] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const token = sessionStorage.getItem("token");

  const defaultForm = {
    name: "",
    model: "",
    image: "",
    description: "",
    pricePerDay: "",
    available: true,
  };

  const [addForm, setAddForm] = useState(defaultForm);
  const [editForm, setEditForm] = useState(defaultForm);

  useEffect(() => {
    fetchCars();
  }, [token]);

  const fetchCars = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`https://car-rental-backend-iy1d.onrender.com/api/admin/cars`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCars(res.data);
    } catch (err) {
      console.error("Failed to fetch cars", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this car?")) {
      try {
        await axios.delete(`https://car-rental-backend-iy1d.onrender.com/api/cars/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCars((prev) => prev.filter((car) => car._id !== id));
      } catch (err) {
        console.error("Failed to delete car", err);
      }
    }
  };

  const openEditForm = (car) => {
    setEditingCar(car);
    setEditForm({ ...car });
  };

  const handleInputChange = (e, isEdit = false) => {
    const { name, value, type, checked } = e.target;
    const updater = isEdit ? setEditForm : setAddForm;
    updater((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `https://car-rental-backend-iy1d.onrender.com/api/cars/${editingCar._id}`,
        editForm,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCars((prev) =>
        prev.map((car) =>
          car._id === editingCar._id ? { ...car, ...editForm } : car
        )
      );
      setEditingCar(null);
    } catch (err) {
      console.error("Failed to update car", err);
    }
  };

  const handleAddCar = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://car-rental-backend-iy1d.onrender.com/api/cars/add", addForm, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCars((prev) => [...prev, res.data]);
      setAddForm(defaultForm);
      setShowAddForm(false);
    } catch (err) {
      console.error("Failed to add car", err);
    }
  };

  return (
    <div className="container mt-5" style={{ backgroundColor: "#f8f9fa", padding: "20px", borderRadius: "8px" }}>
      <h2 className="text-center mb-4" style={{ color: "#343a40" }}>Manage Cars</h2>

      <button
        className="btn"
        style={{ backgroundColor: "#007bff", color: "white", marginBottom: "15px" }}
        onClick={() => {
          setShowAddForm(!showAddForm);
          setAddForm(defaultForm);
        }}
      >
        {showAddForm ? "Close Add Form" : "+ Add New Car"}
      </button>

      {showAddForm && (
        <div className="card p-4 mb-4 shadow" style={{ backgroundColor: "#ffffff", borderRadius: "8px" }}>
          <h5>Add New Car</h5>
          <form onSubmit={handleAddCar}>
            {["name", "model", "image", "description", "pricePerDay"].map((field, i) => (
              <div className="mb-2" key={i}>
                <label className="form-label" style={{ color: "#343a40" }}>{field.replace(/([A-Z])/g, " $1")}</label>
                {field === "description" ? (
                  <textarea
                    className="form-control"
                    name={field}
                    value={addForm[field]}
                    onChange={(e) => handleInputChange(e)}
                    rows="2"
                    style={{ backgroundColor: "#f8f9fa" }}
                  />
                ) : (
                  <input
                    type={field === "pricePerDay" ? "number" : "text"}
                    className="form-control"
                    name={field}
                    value={addForm[field]}
                    onChange={(e) => handleInputChange(e)}
                    required={field !== "image"}
                    style={{ backgroundColor: "#f8f9fa" }}
                  />
                )}
              </div>
            ))}
            <div className="form-check mb-3">
              <input
                type="checkbox"
                className="form-check-input"
                name="available"
                checked={addForm.available}
                onChange={(e) => handleInputChange(e)}
              />
              <label className="form-check-label" style={{ color: "#343a40" }}>Available</label>
            </div>
            <button className="btn btn-success me-2" type="submit" style={{ backgroundColor: "#28a745", color: "white" }}>
              Add Car
            </button>
          </form>
        </div>
      )}

      {loading ? (
        <div className="text-center" style={{ color: "#343a40" }}>Loading cars...</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover" style={{ backgroundColor: "#ffffff" }}>
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Car Name</th>
                <th>Model</th>
                <th>Price/Day</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cars.length > 0 ? (
                cars.map((car, index) => (
                  <tr key={car._id}>
                    <td>{index + 1}</td>
                    <td>{car.name}</td>
                    <td>{car.model}</td>
                    <td>${car.pricePerDay}</td>
                    <td>
                      <span
                        className={`badge ${car.available ? "bg-success" : "bg-danger"}`}
                      >
                        {car.available ? "Available" : "Rented"}
                      </span>
                    </td>
                    <td>
                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => openEditForm(car)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(car._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">
                    No cars found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {editingCar && (
        <div className="card p-4 mt-4 shadow" style={{ backgroundColor: "#ffffff", borderRadius: "8px" }}>
          <h5>Edit Car: {editingCar.name}</h5>
          <form onSubmit={handleUpdate}>
            {["name", "model", "image", "description", "pricePerDay"].map((field, i) => (
              <div className="mb-2" key={i}>
                <label className="form-label" style={{ color: "#343a40" }}>{field.replace(/([A-Z])/g, " $1")}</label>
                {field === "description" ? (
                  <textarea
                    className="form-control"
                    name={field}
                    value={editForm[field]}
                    onChange={(e) => handleInputChange(e, true)}
                    rows="2"
                    style={{ backgroundColor: "#f8f9fa" }}
                  />
                ) : (
                  <input
                    type={field === "pricePerDay" ? "number" : "text"}
                    className="form-control"
                    name={field}
                    value={editForm[field]}
                    onChange={(e) => handleInputChange(e, true)}
                    required={field !== "image"}
                    style={{ backgroundColor: "#f8f9fa" }}
                  />
                )}
              </div>
            ))}
            <div className="form-check mb-3">
              <input
                type="checkbox"
                className="form-check-input"
                name="available"
                checked={editForm.available}
                onChange={(e) => handleInputChange(e, true)}
              />
              <label className="form-check-label" style={{ color: "#343a40" }}>Available</label>
            </div>
            <button className="btn btn-success me-2" type="submit" style={{ backgroundColor: "#28a745", color: "white" }}>
              Update
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => setEditingCar(null)}
              type="button"
              style={{ backgroundColor: "#6c757d", color: "white" }}
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ManageCars;
