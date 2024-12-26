import React, { useState } from "react";
import {Link } from "react-router-dom";
import {FaHeart} from "react-icons/fa";

const Cards = ({ item }) => {
    const [isHeartFillted, setIsHeartFillted] = useState(false)

    const handleHeartClick = () => {
        setIsHeartFillted(!isHeartFillted)
    }
  return (
    <div className="card bg-base-100 w-96 shadow-xl relative">
        <div className={`rating gap-1 absolute right-2 top2 p-4 heartStar ${isHeartFillted ? "text-rose-500": "text-white"}`}
        onClick={handleHeartClick}
        >
            <FaHeart className="h-5 w-5 cursor-pointer"/>
        </div>
      <Link to={`/product/${item._id}`}>
        <figure>
          <img src={item.images}
          className="hover:scale-105 transition-all duration-200 md:h-72"
          />
        </figure>
      </Link>
      <div className="card-body">
        <h2 className="card-title">{item.name}</h2>
        <p>{item.description}</p>
        <div className="card-actions justify-between items-center mt-2">
          <h5 className="font-semibold">
            <span className="text-sm text-red">$</span>
            {item.price}
          </h5>
          <button className="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default Cards;
