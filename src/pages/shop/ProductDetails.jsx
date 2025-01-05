import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaHeart, FaShoppingCart, FaStar } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { AuthContext } from "../../contexts/AuthProvider";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);

  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Fetch product details and reviews
  useEffect(() => {
    const fetchProductAndReviews = async () => {
      try {
        const productResponse = await axiosPublic.get(`/products/${id}`);
        setProduct(productResponse.data);

        const reviewsResponse = await axiosPublic.get(`/reviews/${id}`);
        setReviews(reviewsResponse.data.reviews);
      } catch (error) {
        console.error("Error fetching product or reviews:", error);
      }
    };

    fetchProductAndReviews();
  }, [id, axiosPublic]);

  // Fetch average rating
  useEffect(() => {
    const fetchAverageRating = async () => {
      try {
        const response = await axiosPublic.get(
          `/reviews/products/${id}/average-rating`
        );
        setAverageRating(response.data.averageRating || 0);
      } catch (error) {
        console.error("Error fetching average rating:", error);
      }
    };

    fetchAverageRating();
  }, [id, axiosPublic]);

  const handleAddToCart = async () => {
    if (!user) {
      Swal.fire({
        title: "Authentication Required",
        text: "You need to log in to add items to the cart.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Login Now",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
      return;
    }

    try {
      const cartItem = {
        productId: product._id,
        name: product.name,
        images: product.images,
        price: product.price,
        quantity: 1,
        email: user.email,
      };

      const response = await axiosPublic.post("/carts", cartItem);

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Added to Cart",
          text: "The item has been added to your cart.",
          timer: 1500,
        });
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const handleToggleWishlist = async () => {
    if (!user) {
      Swal.fire({
        title: "Authentication Required",
        text: "You need to log in to add items to the wishlist.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Login Now",
      });
      return;
    }

    try {
      const response = await axiosPublic.post("/wishlists/toggle", {
        email: user.email,
        product: product,
      });

      if (response.status === 200) {
        setIsLiked(!isLiked);
        const message = isLiked ? "Removed from wishlist" : "Added to wishlist";
        Swal.fire("Success", message, "success");
      }
    } catch (error) {
      console.error("Error toggling wishlist:", error);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full md:w-[1250px] px-4 mx-auto mt-8">
      {/* Average Rating */}
      <div className="flex items-center space-x-4 mb-6">
        <div className="flex items-center">
          {[...Array(5)].map((_, index) => (
            <FaStar
              key={index}
              className={
                index < Math.round(averageRating)
                  ? "text-yellow-500"
                  : "text-gray-300"
              }
            />
          ))}
        </div>
        <p className="text-lg text-gray-700 font-medium">
          {averageRating.toFixed(1)} / 5.0 ({reviews.length} reviews)
        </p>
      </div>

      {/* Product Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="order-2 md:order-1">
          <h1 className="text-2xl font-medium">{product.name}</h1>
          <p className="text-xl text-red-500 font-semibold my-2">
            ${product.price.toFixed(2)}
          </p>
          <p className="text-sm text-gray-600">{product.description}</p>
          <div className="mt-6">
            <ul className="text-sm text-gray-600 space-y-2">
              <li>
                <strong>Dimensions:</strong> {product.dimensions.width}cm (W) x{" "}
                {product.dimensions.height}cm (H)
              </li>
              <li>
                <strong>Category:</strong> {product.category}
              </li>
              <li>
                <strong>Material:</strong> {product.material}
              </li>
              <li>
                <strong>Load Capacity:</strong> {product.loadCapacity} kg
              </li>
              <li>
                <strong>Stock:</strong> {product.stock} available
              </li>
            </ul>
          </div>
          <div className="flex items-center space-x-4 mt-6">
            <button
              onClick={handleAddToCart}
              className="bg-steelBlue text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-transparent hover:border hover:text-steelBlue"
            >
              <FaShoppingCart />
              Add to Cart
            </button>
            <button
              onClick={handleToggleWishlist}
              className={`px-6 py-2 rounded-lg flex items-center gap-2 ${
                isLiked
                  ? "bg-red-500 text-white"
                  : "border border-gray-300 text-gray-800 hover:text-steelBlue"
              }`}
            >
              <FaHeart />
              {isLiked ? "Remove from Wishlist" : "Add to Wishlist"}
            </button>
          </div>
        </div>
        <div className="order-1 md:order-2 relative">
          <div
            className="relative cursor-zoom-in"
            onClick={() => setIsModalOpen(true)}
          >
            <img
              src={product.images[currentImageIndex]}
              alt={product.name}
              className="rounded-lg w-full h-96 object-cover hover:scale-110 transition-transform duration-300"
            />
          </div>
          <div className="flex mt-4 space-x-4">
            {product.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index + 1}`}
                className={`w-16 h-16 object-cover rounded-lg cursor-pointer ${
                  currentImageIndex === index
                    ? "border-2 border-steelBlue"
                    : "border"
                }`}
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Add Review Section */}
      {user && (
        <div className="mt-8 mb-8">
          <h2 className="text-2xl font-semibold border-b pb-2">Add a Review</h2>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const rating = parseInt(e.target.rating.value, 10);
              const comment = e.target.comment.value;

              if (!rating || !comment) {
                Swal.fire("Error", "Please fill out all fields!", "error");
                return;
              }

              try {
                const review = {
                  productId: id,
                  userId: user.id,
                  userName: user.name,
                  rating,
                  comment,
                };

                const response = await axiosPublic.post(`/reviews`, review);

                if (response.status === 201) {
                  Swal.fire(
                    "Success",
                    "Your review has been added!",
                    "success"
                  );
                  setReviews((prevReviews) => [...prevReviews, review]);
                  e.target.reset();
                }
              } catch (error) {
                Swal.fire(
                  "Error",
                  "Something went wrong while adding the review.",
                  "error"
                );
              }
            }}
            className="mt-6 space-y-4"
          >
            <div>
              <label
                htmlFor="rating"
                className="block text-sm font-medium text-gray-700"
              >
                Rating
              </label>
              <select
                id="rating"
                name="rating"
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="">Select a rating</option>
                {[...Array(5)].map((_, index) => (
                  <option key={index} value={index + 1}>
                    {index + 1} Star{index > 0 ? "s" : ""}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="comment"
                className="block text-sm font-medium text-gray-700"
              >
                Comment
              </label>
              <textarea
                id="comment"
                name="comment"
                rows="4"
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Write your review here..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Submit Review
            </button>
          </form>
        </div>
      )}

      {/* Customer Reviews */}
      <div className="mt-8 mb-8">
        <h2 className="text-2xl font-semibold border-b pb-2">
          Customer Reviews
        </h2>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="p-6 border border-gray-200 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center mb-4">
                <div className="text-yellow-500 flex">
                  {[...Array(5)].map((_, idx) => (
                    <FaStar
                      key={idx}
                      className={
                        idx < review.rating
                          ? "text-yellow-500"
                          : "text-gray-300"
                      }
                    />
                  ))}
                </div>
                <p className="ml-2 text-sm font-medium text-gray-600">
                  {review.userName}
                </p>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">
                "{review.comment}"
              </p>
              <p className="text-gray-400 text-xs mt-4">
                Posted on {new Date(review.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
        {reviews.length === 0 && (
          <p className="text-center text-gray-500 mt-4">
            No reviews yet. Be the first to leave a review!
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
