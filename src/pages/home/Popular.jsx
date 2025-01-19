import React, { useState, useEffect, useRef } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Cards from "../../components/home/Cards";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import useAxiosPublic from "../../hooks/useAxiosPublic"; // Import the custom hook

const Popular = () => {
  const [products, setProducts] = useState([]);
  const slider = useRef(null);
  const axiosPublic = useAxiosPublic(); // Use the hook to get the axios instance

  useEffect(() => {
    axiosPublic
      .get("/products/popular") // Use axios to get data from the backend
      .then((response) => {
        setProducts(response.data); // Set products from the response
      })
      .catch((error) => {
        console.error("Error fetching popular products:", error);
      });
  }, [axiosPublic]); // Add axiosPublic as a dependency to useEffect

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
    arrows: false, // Disable default arrows
  };

  const Arrow = ({ direction, onClick }) => (
    <button
      onClick={onClick}
      className={`absolute top-1/2 transform -translate-y-1/2 ${direction === "left" ? "left-[-40px] md:left-[-60px] lg:left-[-80px]" : "right-[-40px] md:right-[-60px] lg:right-[-70px]"} p-3 rounded-full bg-steelBlue shadow-md hover:bg-white transition-colors z-10`}
      aria-label={`${direction === "left" ? "Previous" : "Next"} slide`}
    >
      {direction === "left" ? (
        <FaAngleLeft className="h-6 w-6 text-white hover:text-steelBlue" />
      ) : (
        <FaAngleRight className="h-6 w-6 text-white hover:text-steelBlue" />
      )}
    </button>
  );

  return (
    <div className="section-container my-20 relative px-4 md:px-8 lg:px-16">
      {/* Section Title */}
      <div className="text-left mr mb-8">
        <p className="subtitle">Customer Favorites</p>
        <h2 className="title md:w-[520px] text-charcoal">Popular Shelves</h2>
      </div>

      {/* Slider */}
      <div className="relative">
        <Arrow direction="left" onClick={() => slider?.current?.slickPrev()} />
        <Arrow direction="right" onClick={() => slider?.current?.slickNext()} />

        <Slider ref={slider} {...settings}>
          {products.map((item, i) => (
            <div key={i} className="px-2">
              <Cards
                item={item}
                width="100%"
                height="550px"
                imageRatio="70%"
                buttonClass="btn normal"
                onButtonClick={(item) => console.log("Clicked:", item)}
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Popular;
