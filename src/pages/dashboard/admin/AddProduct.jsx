import React, { useRef, useState } from "react";
import { gsap } from "gsap";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AddProduct = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const loaderRef = useRef(null);
  const checkmarkRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, setValue } = useForm();

  const convertToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(",")[1]); // Extract Base64 data
      reader.onerror = (error) => reject(error);
    });

  const handleImageUpload = async (event) => {
    const files = Array.from(event.target.files);
    setIsLoading(true);

    // Start loading animation
    gsap.to(loaderRef.current, {
      scaleX: 1,
      transformOrigin: "left",
      duration: 1,
    });

    const uploadedImageUrls = [];
    for (const file of files) {
      try {
        const base64Image = await convertToBase64(file);
        const formData = new FormData();
        formData.append("image", base64Image);

        const response = await axiosPublic.post(
          `https://api.imgbb.com/1/upload?key=${
            import.meta.env.VITE_IMAGE_HOSTING_KEY
          }`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.data && response.data.data && response.data.data.url) {
          uploadedImageUrls.push(response.data.data.url);
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }

    setImages((prevImages) => [...prevImages, ...uploadedImageUrls]);
    setValue("images", [...images, ...uploadedImageUrls]); // Update react-hook-form
    setIsLoading(false);

    // Show checkmark animation
    gsap.to(checkmarkRef.current, {
      opacity: 1,
      scale: 1,
      transformOrigin: "center",
      duration: 0.5,
      onComplete: () => {
        // Hide checkmark after a delay
        setTimeout(() => {
          gsap.to(checkmarkRef.current, {
            opacity: 0,
            scale: 0,
            duration: 0.5,
          });
        }, 1000);
      },
    });
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    const files = event.dataTransfer.files;
    handleImageUpload({ target: { files } }); // Wrap in an object with target.files
  };

  const removeImage = (imageName) => {
    const updatedImages = images.filter((image) => image !== imageName);
    setImages(updatedImages);
    setValue("images", updatedImages); // Update react-hook-form images field
  };

  const onSubmit = async (data) => {
    try {
      const productData = {
        ...data,
        images, // Include uploaded image URLs
      };

      const response = await axiosSecure.post("/products", productData);

      if (response.status === 200) {
        // Show success alert
        Swal.fire({
          icon: "success",
          title: "Product Added",
          text: "Your product has been added successfully!",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error("Error submitting product data:", error);

      // Show error alert
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: "There was an error while adding the product. Please try again.",
        confirmButtonText: "OK",
      });
    }
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
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Name */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Product Name</span>
              </label>
              <input
                type="text"
                {...register("name", { required: true })}
                placeholder="Type name here"
                className="input input-bordered w-full"
              />
            </div>

            {/* Description */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea
                {...register("description", { required: true })}
                className="textarea textarea-bordered h-24 w-full"
                placeholder="Type Description here"
              ></textarea>
            </div>

            {/* Price */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Price</span>
              </label>
              <input
                {...register("price", { required: true })}
                type="number"
                placeholder="Price"
                className="input input-bordered w-full"
              />
            </div>

            {/* Category and Load Capacity */}
            <div className="flex gap-8">
              {/* Category */}
              <div className="form-control w-full max-w-lg">
                <label className="label">
                  <span className="label-text">Category</span>
                </label>
                <select
                  {...register("category", { required: true })}
                  className="select select-bordered"
                >
                  <option value="">Select a category</option>
                  <option value="Heavy-Duty">Heavy-Duty</option>
                  <option value="Adjustable">Adjustable</option>
                  <option value="Modern">Modern</option>
                  <option value="Rustic">Rustic</option>
                  <option value="Industrial">Industrial</option>
                  <option value="Decorative">Decorative</option>
                  <option value="Kids">Kids</option>
                  <option value="Luxury">Luxury</option>
                </select>
              </div>

              {/* Load Capacity */}
              <div className="form-control w-full max-w-lg">
                <label className="label">
                  <span className="label-text">Load Capacity (kg)</span>
                </label>
                <input
                  {...register("loadCapacity", { required: true })}
                  type="number"
                  placeholder="Load Capacity"
                  className="input input-bordered w-full"
                />
              </div>
            </div>

            {/* Dimensions */}
            <div className="flex items-center gap-8">
              <div className="form-control w-full max-w-lg">
                <label className="label">
                  <span className="label-text">Width (cm)</span>
                </label>
                <input
                  {...register("dimensions.width", { required: true })}
                  type="number"
                  placeholder="Width"
                  className="input input-bordered w-full"
                />
              </div>
              <div className="form-control w-full max-w-lg">
                <label className="label">
                  <span className="label-text">Height (cm)</span>
                </label>
                <input
                  {...register("dimensions.height", { required: true })}
                  type="number"
                  placeholder="Height"
                  className="input input-bordered w-full"
                />
              </div>
            </div>

            {/* Material and Stock Quantity */}
            <div className="flex gap-8">
              {/* Material */}
              <div className="form-control w-full max-w-lg">
                <label className="label">
                  <span className="label-text">Material</span>
                </label>
                <input
                  {...register("material", { required: true })}
                  type="text"
                  placeholder="Material"
                  className="input input-bordered w-full"
                />
              </div>

              {/* Stock Quantity */}
              <div className="form-control w-full max-w-lg">
                <label className="label">
                  <span className="label-text">Stock Quantity</span>
                </label>
                <input
                  {...register("stock", { required: true })}
                  type="number"
                  placeholder="Stock Quantity"
                  className="input input-bordered w-full"
                />
              </div>
            </div>

            {/* Images */}
            <input
              type="hidden"
              {...register("images")}
              value={JSON.stringify(images)} // Save images as a JSON string
            />

            <button className="btn normal mt-5" type="submit">
              Add Product
            </button>
          </form>
        </div>

        {/* Image Upload Section */}
        <div
          className={`w-full md:w-1/3 border-dashed border-2 rounded-lg p-4 ${
            isDragging ? "border-blue-500 bg-blue-100" : "border-gray-300"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <h3 className="text-lg font-semibold mb-4">Product Gallery</h3>
          <div className="flex flex-col items-center justify-center gap-4 h-full">
            <div className="w-full h-40 relative flex items-center justify-center bg-gray-100 border rounded-lg overflow-hidden">
              <div
                ref={loaderRef}
                className="absolute inset-0 bg-blue-500 opacity-20 scale-x-0"
                style={{ transformOrigin: "left", height: "4px", bottom: 0 }}
              ></div>
              <div
                ref={checkmarkRef}
                className="absolute inset-0 flex items-center justify-center opacity-0 scale-0 text-green-500 text-4xl font-bold"
              >
                &#10003;
              </div>
              {isLoading ? (
                <p className="text-gray-500 text-sm animate-pulse z-10">
                  Uploading...
                </p>
              ) : (
                <>
                  <label
                    htmlFor="image-upload"
                    className="cursor-pointer text-steelBlue font-semibold z-10"
                  >
                    {isDragging
                      ? "Drop your image here..."
                      : "Drop your image here, or browse"}
                  </label>
                  <input
                    type="file"
                    id="image-upload"
                    multiple
                    className="hidden"
                    onChange={(event) => handleImageUpload(event)}
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
