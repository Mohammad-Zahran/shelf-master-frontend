import React, { useState, useEffect, useRef } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Cards from "../../components/Cards";
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
    <div className="section-container my-20 relative">
      <div className="text-left mb-8">
        <p className="subtitle ">Popular Shelves</p>
        <h2 className="title md:w-[520px]">Best Shelves for Sale</h2>
      </div>

      <div className="absolute right-40 top-0 z-10 flex space-x-2">
        <button
          onClick={() => slider?.current?.slickPrev()}
          className="btn p-2 rounded-full bg-steelBlue shadow-md hover:bg-white transition-colors"
          aria-label="Previous slide"
        >
          <FaAngleLeft className="h-6 w-6 text-white group-hover:text-steelBlue" />
        </button>
        <button
          onClick={() => slider?.current?.slickNext()}
          className="btn p-2 rounded-full bg-steelBlue shadow-md hover:bg-white transition-colors"
          aria-label="Next slide"
        >
          <FaAngleRight className="h-6 w-6 text-white group-hover:text-steelBlue" />
        </button>
      </div>

      <Slider ref={slider} {...settings}>
        {products.map((item, i) => (
          <div key={i} className="px-2">
            <Cards item={item} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Popular;
