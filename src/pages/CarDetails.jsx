import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const CarDetails = () => {
  const { id } = useParams(); // Car's MongoDB _id
  const [car, setCar] = useState(null);
  const navigate = useNavigate();

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

  if (!car) {
    return <h2 className="text-center mt-5">Loading Car Details...</h2>;
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <img
            src={car.image || "https://via.placeholder.com/400x300"}
            alt={car.name || "Car"}
            className="img-fluid rounded shadow"
          />
        </div>
        <div className="col-md-6">
          <h2>{car.name || "Unnamed Car"}</h2>
          <h4 className="text-primary">₹{car.pricePerDay ?? "N/A"}/day</h4>
          <p>{car.description || "No description available."}</p>
          <button
            className="btn btn-success w-100"
            onClick={() => navigate(`/booking/${car._id}`)}
          >
            Book Now
          </button>
        </div>
      </div>

      {/* Debug section – remove in production */}
      <div className="mt-4">
        <h5>Debug Info:</h5>
        <pre>{JSON.stringify(car, null, 2)}</pre>
      </div>
    </div>
  );
};

export default CarDetails;
