import React from "react";

const About = () => {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-10">
          <div className="card shadow p-4">
            <h2 className="text-center mb-4">About Us</h2>
            <p className="text-muted text-center">
              Welcome to <strong>CarRentalX</strong>, your trusted car rental service. We provide high-quality vehicles at affordable prices with a seamless booking experience.
            </p>
            <div className="row mt-4">
              <div className="col-md-6">
                <img src="/images/about-car.jpg" alt="About Us" className="about-img" />
              </div>
              <div className="col-md-6">
                <h4>Our Mission</h4>
                <p>
                  Our mission is to provide a reliable, hassle-free, and affordable car rental service to make your journey smooth and enjoyable.
                </p>
                <h4>Why Choose Us?</h4>
                <ul>
                  <li>Wide selection of cars</li>
                  <li>Competitive pricing</li>
                  <li>24/7 customer support</li>
                  <li>Easy booking process</li>
                </ul>
              </div>
            </div>
            <div className="text-center mt-4">
              <button className="btn btn-primary">Learn More</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
