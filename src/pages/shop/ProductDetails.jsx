import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaHeart, FaShoppingCart, FaStar, FaTimes } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { AuthContext } from "../../contexts/AuthProvider";
import useCart from "../../hooks/useCart";
import useWishList from "../../hooks/useWishList";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);

  const [email, setEmail] = useState(user?.email || ""); // Pre-fill for logged-in users
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cart, refetch] = useCart();
  const [wishlist, refetch1] = useWishList();

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
        confirmButtonColor: "#4682B4",
        cancelButtonColor: "#d33",
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

      if (response.status === 201 || response.status === 200) {
        refetch();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Item added to cart successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        throw new Error("Failed to add item to cart.");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Could not add item to cart.",
        confirmButtonColor: "#4682B4",
      });
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
        confirmButtonColor: "#4682B4",
        cancelButtonColor: "#d33",
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
        refetch1();
        const message = isLiked ? "Removed from wishlist" : "Added to wishlist";
        Swal.fire({
          position: "center",
          icon: "success",
          title: message,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error("Error toggling wishlist:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Could not update wishlist.",
      });
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();

    if (!email.trim() || rating === 0 || comment.trim() === "") {
      Swal.fire(
        "Validation Error",
        "Email, rating, and comment are required.",
        "error"
      );
      return;
    }

    try {
      setIsSubmitting(true);

      const reviewData = {
        email,
        userId: user?._id || null, // If logged in, include the user ID
        userName: user?.displayName || "Guest", // Default to "Guest" for logged-out users
        rating,
        comment,
      };

      const response = await axiosPublic.post(`/reviews/${id}`, reviewData);

      if (response.status === 201) {
        Swal.fire({
          title: "Success",
          text: "Review submitted successfully!",
          icon: "success",
          confirmButtonColor: "#4682B4",
        });
        setReviews((prevReviews) => [...prevReviews, response.data.review]);
        setEmail(user?.email || "");
        setRating(0);
        setComment("");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      Swal.fire({
        title: "Error",
        text: error.response?.data?.message || "Could not submit review.",
        icon: "error",
        confirmButtonColor: "#4682B4",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full md:w-[1250px] px-4 mx-auto mt-8">
      {/* Product Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="order-2 md:order-1">
          <h1 className="text-6xl text-charcoal">{product.name}</h1>
          <div className="flex justify-between items-center space-x-2 my-2">
            {/* Product Price */}
            <p className="text-5xl">${product.price.toFixed(2)}</p>

            {/* Average Rating */}
            <div className="flex items-center space-x-2">
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
          </div>
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

        {/* Image and Modal Section */}
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

          {/* Full-Screen Modal */}
          {isModalOpen && (
            <div
              className="fixed inset-0 z-50 bg-black bg-opacity-80 flex justify-center items-center"
              onClick={() => setIsModalOpen(false)}
            >
              <div className="relative" onClick={(e) => e.stopPropagation()}>
                <img
                  src={product.images[currentImageIndex]}
                  alt={product.name}
                  className="max-w-[90%] max-h-[80%] object-contain rounded-lg"
                />
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-4 right-4 text-white text-2xl"
                >
                  <FaTimes />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 mb-8">
        <h2 className="text-2xl font-semibold border-b pb-2">Add a Review</h2>
        <form onSubmit={handleSubmitReview} className="mt-4 space-y-4">
          {/* Email Input */}
          <input
            type="email"
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-steelBlue"
            placeholder="Enter your email"
            value={user?.email || ""}
            onChange={(e) => {
              if (!user) setEmail(e.target.value);
            }}
            disabled={!!user}
            required
          />

          {/* Rating Input */}
          <div className="flex items-center space-x-2">
            {[...Array(5)].map((_, index) => (
              <FaStar
                key={index}
                className={`cursor-pointer ${
                  index < rating ? "text-yellow-500" : "text-gray-300"
                }`}
                onClick={() => setRating(index + 1)}
              />
            ))}
          </div>

          {/* Comment Input */}
          <textarea
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-steelBlue"
            placeholder="Write your review here..."
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          ></textarea>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-steelBlue text-white px-6 py-2 rounded-lg hover:bg-transparent hover:text-steelBlue border border-steelBlue"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Review"}
          </button>
        </form>
      </div>

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
