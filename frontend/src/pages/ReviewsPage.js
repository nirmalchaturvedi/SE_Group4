import React from 'react';
import { FaStar, FaQuoteLeft, FaUser } from 'react-icons/fa';
import './reviews.css';
import Navbar from './Navbar';

const ReviewsPage = () => {
  // Sample review data
  const reviews = [
    {
      id: 1,
      name: 'Rajesh Sharma',
      company: 'Precision Engineering Works',
      rating: 5,
      review: "Mehta Enterprises has been our trusted bearing supplier for over a decade. Their products consistently exceed our quality expectations and their technical support is exceptional.",
      date: '2023-10-15'
    },
    {
      id: 2,
      name: 'Priya Patel',
      company: 'Industrial Solutions Ltd.',
      rating: 4,
      review: "Reliable delivery and excellent product quality. We've reduced our maintenance costs by 30% since switching to Mehta's premium bearing solutions.",
      date: '2023-09-22'
    },
    {
      id: 3,
      name: 'Amit Desai',
      company: 'Heavy Machinery Corp',
      rating: 5,
      review: "The technical expertise of Mehta's team helped us solve a persistent vibration issue in our production line. Their bearings outperformed competitors in our stress tests.",
      date: '2023-08-05'
    },
    {
      id: 4,
      name: 'Neha Gupta',
      company: 'Automotive Components Inc.',
      rating: 5,
      review: "We've standardized on Mehta bearings across all our production facilities. The consistency and durability are unmatched in the industry.",
      date: '2023-07-18'
    },
    {
      id: 5,
      name: 'Vikram Joshi',
      company: 'Power Transmission Systems',
      rating: 4,
      review: "Excellent service and product quality. Their grease products have significantly extended our bearing life in high-temperature applications.",
      date: '2023-06-30'
    },
    {
      id: 6,
      name: 'Sanjay Mehta',
      company: 'Textile Machinery Group',
      rating: 5,
      review: "After trying several suppliers, we've found Mehta Enterprises to be the most reliable partner. Their products have reduced our downtime by 40%.",
      date: '2023-05-12'
    }
  ];

  // Calculate average rating
  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  return (
    <div className="reviews-page">
      <Navbar></Navbar>
      <section className="reviews-hero">
        <div className="reviews-hero-content">
          <h1>Customer Experiences</h1>
          <p>Hear from industry leaders who trust Mehta Enterprises for their critical bearing solutions</p>
          
          <div className="rating-summary">
            <div className="average-rating">
              <span className="rating-number">{averageRating.toFixed(1)}</span>
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <FaStar 
                    key={i} 
                    className={i < Math.floor(averageRating) ? 'star-filled' : 'star-empty'} 
                  />
                ))}
              </div>
              <span className="rating-count">{reviews.length} reviews</span>
            </div>
          </div>
        </div>
      </section>

      <section className="reviews-container">
        <div className="reviews-grid">
          {reviews.map((review) => (
            <div key={review.id} className="review-card">
              <div className="review-header">
                <div className="reviewer-avatar">
                  <FaUser />
                </div>
                <div className="reviewer-info">
                  <h3>{review.name}</h3>
                  <p className="company">{review.company}</p>
                  <div className="review-rating">
                    {[...Array(5)].map((_, i) => (
                      <FaStar 
                        key={i} 
                        className={i < review.rating ? 'star-filled' : 'star-empty'} 
                      />
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="review-content">
                <FaQuoteLeft className="quote-icon" />
                <p>{review.review}</p>
              </div>
              
              <div className="review-footer">
                <span className="review-date">
                  {new Date(review.date).toLocaleDateString('en-IN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="add-review">
        <h2>Share Your Experience</h2>
        <p>We value your feedback. Let us know about your experience with Mehta Enterprises.</p>
        <button className="review-cta">Write a Review</button>
      </section>
    </div>
  );
};

export default ReviewsPage;