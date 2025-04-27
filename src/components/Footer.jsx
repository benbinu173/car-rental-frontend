import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer style={{ backgroundColor: "#f8f9fa", color: "#333" }} className="py-4 mt-5 border-top">
      <Container>
        <Row className="text-center text-md-start">
          {/* Company Info */}
          <Col md={4} className="mb-3">
            <h5 className="fw-bold">CarRental</h5>
            <p>Drive Your Dream – Rent the Best!</p>
          </Col>

          {/* Quick Links */}
          <Col md={4} className="mb-3">
            <h5 className="fw-bold">Quick Links</h5>
            <ul className="list-unstyled">
              <li><Link to="/" className="text-dark text-decoration-none">Home</Link></li>
              <li><Link to="/cars" className="text-dark text-decoration-none">Browse Cars</Link></li>
              <li><Link to="/about" className="text-dark text-decoration-none">About Us</Link></li>
              <li><Link to="/contact" className="text-dark text-decoration-none">Contact</Link></li>
            </ul>
          </Col>

          {/* Social Media Links */}
          <Col md={4} className="text-md-end">
            <h5 className="fw-bold">Follow Us</h5>
            <div>
              <a href="#" className="text-dark me-3"><FaFacebook size={24} /></a>
              <a href="#" className="text-dark me-3"><FaTwitter size={24} /></a>
              <a href="#" className="text-dark me-3"><FaInstagram size={24} /></a>
              <a href="#" className="text-dark"><FaLinkedin size={24} /></a>
            </div>
          </Col>
        </Row>

        {/* Copyright */}
        <Row className="mt-3 text-center">
          <Col>
            <p className="mb-0">&copy; {new Date().getFullYear()} CarRental. All Rights Reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
