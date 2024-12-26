import React, { useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Cards from "./Cards";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";

const Test = () => {
  const [products, setProducts] = useState([]);
  const slider = React.useRef(null);

  useEffect(() => {
    fetch("/product.json")
      .then((res) => res.json())
      .then((data) => {
        const specials = data.filter((item) => item.category === "Heavy-Duty");
        setProducts(specials);
      });
  }, []);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 970,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    arrows: false, // Disable default arrows
  };

  return (
    <div className="section-container my-20 relative">
      <div className="text-left mb-8">
        <p className="subtitle">Popular Shelves</p>
        <h2 className="title md:w-[520px]">Best Shelves for Sale</h2>
      </div>

      <div className="absolute right-0 top-0 z-10 flex space-x-2">
        <button
          onClick={() => slider?.current?.slickPrev()}
          className="btn p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors"
          aria-label="Previous slide"
        >
          <FaAngleLeft className="h-6 w-6 text-gray-600" />
        </button>
        <button
          onClick={() => slider?.current?.slickNext()}
          className="btn p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors"
          aria-label="Next slide"
        >
          <FaAngleRight className="h-6 w-6 text-gray-600" />
        </button>
      </div>

      <Slider ref={slider} {...settings}>
        {products.map((item, i) => (
          <Cards key={i} item={item} />
        ))}
      </Slider>
    </div>
  );
};

export default Test;

