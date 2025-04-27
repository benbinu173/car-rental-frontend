import React from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const CarCard = ({ car }) => {
  const navigate = useNavigate();

  return (
    <Card className="shadow-lg rounded-3 car-card h-100">
      <Card.Img
        variant="top"
        src={car.image}
        alt={car.name}
        style={{ height: "200px", objectFit: "cover" }}
      />
      <Card.Body>
        <Card.Title>{car.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          ₹{car.pricePerDay}/day
        </Card.Subtitle>
        <Card.Text style={{ height: "60px", overflow: "hidden" }}>
          {car.description}
        </Card.Text>
        <Button
          variant="primary"
          onClick={() => navigate(`/cars/${car._id}`)}
          className="w-100"
        >
          View Details
        </Button>
      </Card.Body>
    </Card>
  );
};

export default CarCard;
