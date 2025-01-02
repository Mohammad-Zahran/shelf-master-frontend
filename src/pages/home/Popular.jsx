import React, { useState, useEffect, useRef } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Cards from "../../components/home/Cards";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";

const Popular = () => {
  const [products, setProducts] = useState([]);
  const slider = useRef(null);

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
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    arrows: false,
  };

  return (
    <div className="section-container my-20 relative px-4 md:px-8 lg:px-16">
      {/* Section Title */}
      <div className="text-center mb-8">
        <p className="subtitle text-sm md:text-base">Popular Shelves</p>
        <h2 className="title md:w-[520px] mx-auto text-lg md:text-2xl lg:text-3xl font-bold">
          Best Shelves for Sale
        </h2>
      </div>

      {/* Navigation Buttons */}
      <div className="absolute right-4 md:right-10 lg:right-20 top-0 z-10 flex space-x-2">
        <button
          onClick={() => slider?.current?.slickPrev()}
          className="btn p-2 rounded-full bg-steelBlue shadow-md hover:bg-white transition-colors"
          aria-label="Previous slide"
        >
          <FaAngleLeft className="h-6 w-6 text-white hover:text-steelBlue" />
        </button>
        <button
          onClick={() => slider?.current?.slickNext()}
          className="btn p-2 rounded-full bg-steelBlue shadow-md hover:bg-white transition-colors"
          aria-label="Next slide"
        >
          <FaAngleRight className="h-6 w-6 text-white hover:text-steelBlue" />
        </button>
      </div>

      {/* Slider */}
      <Slider ref={slider} {...settings}>
        {products.map((item, i) => (
          <div key={i} className="px-2">
            <Cards
              item={item}
              width="100%" // Adjusted for responsiveness
              height="auto" // Maintain aspect ratio for images
              imageRatio="80%"
              buttonClass="btn normal"
              onButtonClick={(item) => console.log("Clicked:", item)}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Popular;
