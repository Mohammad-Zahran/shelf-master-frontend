import React from "react";
import SwipeCards from "../../components/home/SwipeCards";

const Testimonials = () => {
  return (
    <div>
      <div className="py-8">
        <p className="text-steelBlue text-lg md:w-[520px] mx-auto text-left">
          See what our customers have to say about us
        </p>
        <h1 className="text-4xl md:text-5xl font-bold text-charcoal md:w-[520px] mx-auto text-left">
          Testimonials
        </h1>
      </div>

      <SwipeCards />
    </div>
  );
};

export default Testimonials;
