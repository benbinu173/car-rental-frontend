import React, { useEffect, useState } from "react";
import axios from "axios";
import CarCard from "../components/CarCard";

const CarList = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get("https://car-rental-backend-pj3k.onrender.com/api/cars");

        // Check if response is an array or has a 'cars' key
        if (Array.isArray(response.data)) {
          setCars(response.data);
        } else if (Array.isArray(response.data.cars)) {
          setCars(response.data.cars);
        } else {
          console.error("Unexpected response format:", response.data);
        }
      } catch (error) {
        console.error("Failed to fetch cars:", error);
      }
    };

    fetchCars();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Available Cars for Rent</h2>
      <div className="row g-4">
        {cars.length === 0 ? (
          <p className="text-center">No cars available at the moment.</p>
        ) : (
          cars.map((car) => (
            <div key={car._id} className="col-12 col-sm-6 col-md-4 col-lg-3">
              <CarCard car={car} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CarList;
