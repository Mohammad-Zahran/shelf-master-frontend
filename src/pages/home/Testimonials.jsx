import React from "react";
import SwipeCards from "../../components/home/SwipeCards";

const Testimonials = () => {
  return (
    <div>
      <div className="section-container my-20 relative px-4 md:px-8 lg:px-16">
        <div className="text-left mr mb-8">
          <p className="subtitle">
            See what our customers have to say about us
          </p>
          <h2 className="title md:w-[520px] text-charcoal">Testimonials</h2>
        </div>
      </div>

      <SwipeCards />
    </div>
  );
};

export default Testimonials;
