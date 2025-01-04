import React, { useState } from "react";

const AddProduct = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    setIsLoading(true);

    // Simulate an upload process
    setTimeout(() => {
      const uploadedImages = files.map((file) => file.name); // Here you can replace with actual uploaded URLs
      setImages((prevImages) => [...prevImages, ...uploadedImages]);
      setIsLoading(false);
    }, 1500); // Simulate upload time
  };

  const removeImage = (imageName) => {
    setImages((prevImages) =>
      prevImages.filter((image) => image !== imageName)
    );
  };
  return (
    <div className="w-full md:w-[1250px] px-4 mx-auto">
      <h2 className="text-2xl font-semibold my-4">
        Upload A New <span className="text-steelBlue">Shelf Item</span>
      </h2>

      {/* Form and Image Input Wrapper */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Form Section */}
        <div className="flex-1">
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
                className="input input-bordered w-full"
              />
            </div>

            {/* 2nd Row */}
            {/* Description */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea
                className="textarea textarea-bordered h-24 w-full"
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
                className="input input-bordered w-full"
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
                  className="input input-bordered w-full"
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
                  className="input input-bordered w-full"
                />
              </div>
              {/* Height */}
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Height</span>
                </label>
                <input
                  type="number"
                  placeholder="Height"
                  className="input input-bordered w-full"
                />
              </div>
            </div>

            {/* 6th Row */}
            {/* Material */}
            <div className="flex items-center gap-8">
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Material</span>
                </label>
                <input
                  type="text"
                  placeholder="Material"
                  className="input input-bordered w-full"
                />
              </div>
              {/* Stock Quantity */}
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Stock Quantity</span>
                </label>
                <input
                  type="number"
                  placeholder="Stock Quantity"
                  className="input input-bordered w-full"
                />
              </div>
            </div>

            <button className="btn normal mt-5">Add Product</button>
          </form>
        </div>

        {/* Image Upload Section */}
        <div className="w-full md:w-1/3 border-dashed border-2 border-gray-300 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4">Product Gallery</h3>
          <div className="flex flex-col items-center justify-center gap-4 h-full">
            <div className="w-full h-40 flex items-center justify-center bg-gray-100 border rounded-lg">
              {isLoading ? (
                <p className="text-gray-500 text-sm animate-pulse">
                  Uploading...
                </p>
              ) : (
                <>
                  <label
                    htmlFor="image-upload"
                    className="cursor-pointer text-steelBlue font-semibold"
                  >
                    Drop your image here, or <span>browse</span>
                  </label>
                  <input
                    type="file"
                    id="image-upload"
                    multiple
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </>
              )}
            </div>
            <ul className="w-full">
              {images.map((image, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between border-b py-2"
                >
                  <span>{image}</span>
                  <button
                    onClick={() => removeImage(image)}
                    className="text-red-500 font-bold"
                  >
                    &#10005;
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
