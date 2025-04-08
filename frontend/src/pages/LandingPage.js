import React from 'react';
import { Link } from 'react-router-dom';
import { FaCog, FaShieldAlt, FaTruck, FaChartLine, FaIndustry } from 'react-icons/fa';
import './LandingPage.css';

function LandingPage() {
    return (
        <div className="landing-page">
            {/* Hero Section */}
            <section className="landing-hero">
                <h1 className="landing-title">Welcome to Mehta Enterprise</h1>
                <p className="landing-description">
                    Your trusted partner for <span className="landing-highlight">industrial bearings</span> and 
                    <span className="landing-highlight"> mechanical products</span> since 1985.
                </p>
                <div className="landing-buttons">
                    <Link to="/signin">
                        <button className="landing-button">Sign In</button>
                    </Link>
                    <Link to="/signup">
                        <button className="landing-button secondary">Register</button>
                    </Link>
                </div>
            </section>

            {/* Features Section */}
            <section className="landing-features">
                <div className="feature-card">
                    <div className="feature-icon"><FaIndustry /></div>
                    <h3 className="feature-title">Premium Quality</h3>
                    <p className="feature-description">
                        ISO-certified bearings with industry-leading durability and performance standards.
                    </p>
                </div>
                <div className="feature-card">
                    <div className="feature-icon"><FaTruck /></div>
                    <h3 className="feature-title">Fast Delivery</h3>
                    <p className="feature-description">
                        Nationwide distribution network ensuring timely delivery to your doorstep.
                    </p>
                </div>
                <div className="feature-card">
                    <div className="feature-icon"><FaShieldAlt /></div>
                    <h3 className="feature-title">Trusted Supplier</h3>
                    <p className="feature-description">
                        35+ years of experience serving major industries across India.
                    </p>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="testimonials">
                <h2 className="section-title">What Our Clients Say</h2>
                <div className="testimonial-cards">
                    <div className="testimonial-card">
                        <p>"Mehta Enterprise has been our reliable bearing supplier for over a decade."</p>
                        <div className="client-info">
                            <span className="client-name">- Rajesh Sharma</span>
                            <span className="client-company">ABC Manufacturing</span>
                        </div>
                    </div>
                    <div className="testimonial-card">
                        <p>"Excellent product quality and exceptional customer service."</p>
                        <div className="client-info">
                            <span className="client-name">- Priya Patel</span>
                            <span className="client-company">XYZ Industries</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="cta-section">
                <h2>Ready to Experience the Mehta Enterprise Difference?</h2>
                <p>Join hundreds of satisfied industrial customers today</p>
                <Link to="/signup">
                    <button className="cta-button">Get Started Now</button>
                </Link>
            </section>
        </div>
    );
}

export default LandingPage;