import React, { useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const Test = () => {
  const [products, setProducts] = useState([]);
  const slider = React.useRef(null);

  useEffect(() => {
    fetch("/product.json")
      .then((res) => res.json())
      .then((data) => {
        const specials = data.filter((item) => item.category === "Heavy-Duty");
        // console.log(specials);
        setProducts(specials);
      });
  }, []);
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="section-container my-20">
      <div className="text-left">
        <p className="subtitle">Popular Shelves</p>
        <h2 className="title md:w-[520px]">Best Shelves for Sale</h2>
      </div>

      <Slider {...settings}>
        {
            products.map((item, i) => (
                
            ))
        }
      </Slider>
    </div>
  );
};

export default Test;
