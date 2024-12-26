import React from "react";
import SwipeCards from "../../components/SwipeCards";

const Reviews = () => {
  const handleReviewButtonClick = () => {
    alert("Review button clicked!");
  };

  return (
    <div>
      <div className="text-center py-8">
        <p className="text-steelBlue text-lg">
          See what our customers have to say about us
        </p>
        <h1 className="text-4xl md:text-5xl font-bold text-charcoal">
          Testimonials
        </h1>
      </div>
      <SwipeCards />
      <div className="text-center mt-8">
        <button className="btn" onClick={handleReviewButtonClick}>
          Review
        </button>
      </div>
    </div>
  );
};

export default Reviews;
