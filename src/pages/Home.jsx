import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Button, Container, Row, Col, Spinner } from "react-bootstrap";
import CarCard from "../components/CarCard";

const Home = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  const heroStyle = {
    background: 'linear-gradient(to right, #0f2027, #203a43, #2c5364)',
    color: 'white',
    padding: '100px 20px',
    textAlign: 'center',
  };

  const sectionHeading = {
    fontSize: '2.2rem',
    fontWeight: '600',
    marginBottom: '30px',
    textAlign: 'center',
    color: '#333',
  };

  const subText = {
    color: '#ddd',
    fontSize: '1.2rem',
    maxWidth: '600px',
    margin: '10px auto 30px',
  };

  const testimonialStyle = {
    backgroundColor: "#f8f9fa",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
    marginBottom: "20px",
    textAlign: "center",
  };

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await axios.get("https://car-rental-backend-iy1d.onrender.com/api/cars");
        console.log("Fetched cars data:", res.data); // 👈 Add this to inspect
        setCars(res.data.cars.slice(0, 3)); // Update this if response is { cars: [...] }
      } catch (error) {
        console.error("Failed to fetch cars:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchCars();
  }, []);
  

  return (
    <>
      {/* Hero Section */}
      <div style={heroStyle}>
        <h1 style={{ fontSize: "3rem", fontWeight: "bold" }}>Find Your Perfect Rental Car</h1>
        <p style={subText}>Rent a car with ease and comfort at affordable prices.</p>
        <Link to="/cars">
          <Button variant="light" size="lg" style={{ fontWeight: "600" }}>Browse Cars</Button>
        </Link>
      </div>

      {/* Featured Cars */}
      <Container className="mt-5">
        <h2 style={sectionHeading}>Featured Cars</h2>
        {loading ? (
          <div className="text-center">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <Row>
            {cars.slice(0, 3).map((car) => (
              <Col md={4} key={car._id} className="mb-4">
                <CarCard car={car} />
              </Col>
            ))}
          </Row>
        )}
      </Container>

      {/* How It Works Section */}
      <div className="mt-5" style={{ backgroundColor: "#f1f1f1", padding: "60px 20px" }}>
        <Container>
          <h2 style={sectionHeading}>How It Works</h2>
          <Row className="text-center">
            <Col md={4}>
              <h4>1. Choose a Car</h4>
              <p>Select from a variety of rental cars available.</p>
            </Col>
            <Col md={4}>
              <h4>2. Book Online</h4>
              <p>Fill in your details and confirm the booking.</p>
            </Col>
            <Col md={4}>
              <h4>3. Drive & Enjoy</h4>
              <p>Pick up the car and enjoy your journey.</p>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Testimonials */}
      <Container className="mt-5 mb-5">
        <h2 style={sectionHeading}>What Our Customers Say</h2>
        <Row>
          <Col md={4}>
            <div style={testimonialStyle}>
              <p>"Best rental experience! The car was clean and ready on time."</p>
              <h5>- John Doe</h5>
            </div>
          </Col>
          <Col md={4}>
            <div style={testimonialStyle}>
              <p>"Smooth booking process and affordable prices!"</p>
              <h5>- Sarah Lee</h5>
            </div>
          </Col>
          <Col md={4}>
            <div style={testimonialStyle}>
              <p>"Highly recommend! Great customer service and reliable cars."</p>
              <h5>- Alex Smith</h5>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;
