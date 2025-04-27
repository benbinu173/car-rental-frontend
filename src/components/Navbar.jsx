import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Navbar, Nav, Container, Button } from "react-bootstrap";

const CustomNavbar = () => {
  const location = useLocation(); // To check current path

  return (
    <Navbar
      expand="lg"
      bg="light"
      variant="light"
      className="shadow-sm"
      style={{ backgroundColor: "#f8f9fa" }} // Light Background
    >
      <Container>
        {/* Logo / Brand */}
        <Navbar.Brand
          as={Link}
          to="/"
          style={{ color: "#000", fontWeight: "bold" }} // Black Brand Text
        >
          CarRental
        </Navbar.Brand>

        {/* Toggle Button for Mobile */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          {/* Left Side Links */}
          <Nav className="me-auto">
            <Nav.Link
              as={NavLink}
              to="/"
              exact
              style={{ color: "#000", fontWeight: "500" }} // Black Nav Links
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/cars"
              style={{ color: "#000", fontWeight: "500" }}
            >
              Cars
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/about"
              style={{ color: "#000", fontWeight: "500" }}
            >
              About Us
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/contact"
              style={{ color: "#000", fontWeight: "500" }}
            >
              Contact
            </Nav.Link>
          </Nav>

          {/* Right Side Links (Login/Register or Dashboard) */}
          <Nav>
            {location.pathname.startsWith("/admin") ? (
              <>
                <Nav.Link
                  as={NavLink}
                  to="/admin"
                  style={{ color: "#000", fontWeight: "500" }}
                >
                  Admin Dashboard
                </Nav.Link>
                <Nav.Link
                  as={NavLink}
                  to="/admin/login"
                  style={{ color: "#000", fontWeight: "500" }}
                >
                  Login
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link
                  as={NavLink}
                  to="/dashboard"
                  style={{ color: "#000", fontWeight: "500" }}
                >
                  Dashboard
                </Nav.Link>
                <Button
                  as={Link}
                  to="/login"
                  variant="outline-dark"
                  className="me-2"
                  style={{ borderColor: "#000", color: "#000" }}
                >
                  Login
                </Button>
                <Button as={Link} to="/register" variant="dark">
                  Register
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
