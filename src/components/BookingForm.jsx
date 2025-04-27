import React from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

const BookingForm = () => {
  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Book Your Car</h2>
      <Row className="justify-content-center">
        <Col md={6}>
          <Form className="shadow-lg p-4 rounded booking-form">
            {/* Name */}
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control type="text" placeholder="Enter your name" required />
            </Form.Group>

            {/* Email */}
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter your email" required />
            </Form.Group>

            {/* Phone */}
            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control type="text" placeholder="Enter your phone number" required />
            </Form.Group>

            {/* Car Selection */}
            <Form.Group className="mb-3">
              <Form.Label>Select Car</Form.Label>
              <Form.Select required>
                <option value="">-- Choose a Car --</option>
                <option value="Tesla Model 3">Tesla Model 3</option>
                <option value="BMW X5">BMW X5</option>
                <option value="Audi A6">Audi A6</option>
              </Form.Select>
            </Form.Group>

            {/* Pickup Date */}
            <Form.Group className="mb-3">
              <Form.Label>Pickup Date</Form.Label>
              <Form.Control type="date" required />
            </Form.Group>

            {/* Drop-off Date */}
            <Form.Group className="mb-3">
              <Form.Label>Drop-off Date</Form.Label>
              <Form.Control type="date" required />
            </Form.Group>

            {/* Submit Button */}
            <Button variant="primary" type="submit" className="w-100">
              Confirm Booking
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default BookingForm;
