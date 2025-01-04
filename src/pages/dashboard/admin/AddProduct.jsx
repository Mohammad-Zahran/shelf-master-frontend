import React from "react";

const AddProduct = () => {
  return (
    <div className="w-full md:w-[1250px] px-4 mx-auto">
      <h2 className="text-2xl font-semibold my-4">
        Upload A New <span className="text-steelBlue">Shelf Item</span>
      </h2>

      {/* form input */}
      <div>
        <form>
          {/* 1st Row */}
          {/* Product Name */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Product Name</span>
            </label>
            <input
              type="text"
              placeholder="Type name here"
              className="input input-bordered w-full max-w-2xl"
            />
          </div>

          {/* 2nd Row */}
          <div className="flex items-center gap-8">
            {/* Category */}
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Choose Category</span>
              </label>
              <select className="select select-bordered">
                <option disabled selected>
                  Select a category
                </option>
                <option>Star Wars</option>
                <option>Harry Potter</option>
                <option>Lord of the Rings</option>
                <option>Planet of the Apes</option>
                <option>Star Trek</option>
              </select>
            </div>

            {/* Load Capacity */}
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Load Capacity</span>
              </label>
              <input
                type="number"
                placeholder="Load Capacity"
                className="input input-bordered w-full max-w-2xl"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
