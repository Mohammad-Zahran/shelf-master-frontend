import React from "react";
import { Link } from "react-router-dom";

const Cards = ({ item }) => {
  return (
    <div className="card bg-base-100 w-96 shadow-xl">
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
