import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { AuthContext } from "../../contexts/AuthProvider";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);

  const [product, setProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axiosPublic.get(`/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
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
        const message = isLiked
          ? "Removed from wishlist"
          : "Added to wishlist";
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left: Product Images */}
        <div>
          <div className="relative">
            <img
              src={product.images[currentImageIndex]}
              alt={product.name}
              className="rounded-lg w-full h-96 object-cover"
            />
            <div className="absolute top-2 right-2">
              <button
                onClick={handleToggleWishlist}
                className={`p-3 rounded-full ${
                  isLiked ? "bg-red-500 text-white" : "bg-gray-300 text-gray-800"
                }`}
              >
                <FaHeart />
              </button>
            </div>
          </div>
          {/* Image thumbnails */}
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

        {/* Right: Product Details */}
        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-xl text-red-500 font-semibold my-2">
            ${product.price.toFixed(2)}
          </p>
          <p className="text-sm text-gray-600">{product.description}</p>

          {/* Rating */}
          <div className="flex items-center mt-4">
            <div className="text-yellow-500 font-bold">4.6</div>
            <p className="text-sm text-gray-500 ml-2">(556 reviews)</p>
          </div>

          {/* Add to Cart */}
          <div className="flex items-center space-x-4 mt-6">
            <button
              onClick={handleAddToCart}
              className="bg-steelBlue text-white px-6 py-2 rounded-lg hover:bg-transparent hover:border hover:text-steelBlue"
            >
              Add to Cart
            </button>
            <button
              onClick={handleToggleWishlist}
              className="border px-6 py-2 rounded-lg text-gray-800 hover:text-steelBlue"
            >
              {isLiked ? "Remove from Wishlist" : "Add to Wishlist"}
            </button>
          </div>

          {/* Additional Info */}
          <div className="mt-6">
            <ul className="text-sm text-gray-600">
              <li>Free 3-5 day shipping</li>
              <li>Tool-free assembly</li>
              <li>30-day trial</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
