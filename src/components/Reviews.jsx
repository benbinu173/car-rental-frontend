import React from "react";
import { Card, Container, Row, Col } from "react-bootstrap";

const reviews = [
  {
    id: 1,
    name: "John Doe",
    comment: "Great experience! The car was in excellent condition and the booking process was smooth.",
    rating: "⭐⭐⭐⭐⭐",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    comment: "Very reliable service. Will definitely rent again!",
    rating: "⭐⭐⭐⭐",
  },
  {
    id: 3,
    name: "Michael Smith",
    comment: "Affordable prices and great customer support. Highly recommend!",
    rating: "⭐⭐⭐⭐⭐",
  },
];

const Reviews = () => {
  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Customer Reviews</h2>
      <Row>
        {reviews.map((review) => (
          <Col key={review.id} md={4} className="mb-4">
            <Card className="shadow-sm p-3 review-card">
              <Card.Body>
                <Card.Title>{review.name}</Card.Title>
                <Card.Text>"{review.comment}"</Card.Text>
                <Card.Text className="text-warning">{review.rating}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Reviews;
