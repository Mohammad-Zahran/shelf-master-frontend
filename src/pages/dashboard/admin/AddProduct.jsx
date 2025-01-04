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
          {/* Description */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <textarea
              className="textarea textarea-bordered h-24 max-w-2xl"
              placeholder="Type Description here"
            ></textarea>
          </div>

          {/* 3rd Row */}
          {/* Price */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Price</span>
            </label>
            <input
              type="number"
              placeholder="Price"
              className="input input-bordered w-full max-w-2xl"
            />
          </div>

          {/* 4th Row */}
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

          {/* 5th Row */}
          {/* Width */}
          <div className="flex items-center gap-8">
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Width</span>
              </label>
              <input
                type="number"
                placeholder="Width"
                className="input input-bordered w-full max-w-xs"
              />
            </div>
            {/* Height */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Height</span>
              </label>
              <input
                type="number"
                placeholder="Height"
                className="input input-bordered w-full max-w-xs"
              />
            </div>
          </div>

          {/* 5th Row */}
          {/* Material */}
          <div className="flex items-center gap-8">
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Material</span>
              </label>
              <input
                type="text"
                placeholder="Material"
                className="input input-bordered w-full max-w-xs"
              />
            </div>
            {/* Stock Quantity */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Stock Quantity</span>
              </label>
              <input
                type="text"
                placeholder="Height"
                className="input input-bordered w-full max-w-xs"
              />
            </div>
          </div>

          <button className="btn normal mt-5">Add Product</button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
