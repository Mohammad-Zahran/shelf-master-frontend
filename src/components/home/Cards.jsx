import React, { useRef, useState, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { FaHeart } from "react-icons/fa";
import { gsap } from "gsap";
import { AuthContext } from "../../contexts/AuthProvider";
import Swal from "sweetalert2";
import useCart from "../../hooks/useCart";
import useWishList from "../../hooks/useWishList";

const ROTATION_RANGE = 20;
const HALF_ROTATION_RANGE = ROTATION_RANGE / 2;

const Cards = ({
  item,
  width = "320px",
  height = "440px",
  imageRatio = "70%",
  buttonText = "Add to Cart",
  buttonClass = "bg-steelBlue text-white hover:bg-transparent border border-transparent hover:border hover:text-steelBlue hover:border-steelBlue",
}) => {
  const { _id, name, images, material, price } = item;
  const ref = useRef(null);
  const imageRef = useRef(null);
  const [isLiked, setIsLiked] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const { user } = useContext(AuthContext);
  const [cart, refetch] = useCart();
  const [wishlist, refetch1] = useWishList();

  const navigate = useNavigate();
  const location = useLocation();

  // Function to handle cart addition
  const handleAddtoCart = async (item) => {
    if (user && user?.email) {
      const existingCartItem = cart.find(
        (cartItem) => cartItem.productId === _id
      );

      if (existingCartItem) {
        Swal.fire({
          title: "Item Already in Cart",
          text: "This item is already in your cart.",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#4682B4",
          cancelButtonColor: "#d33",
          confirmButtonText: "Go to Cart",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/cart-page");
          }
        });
        return;
      }

      const cartItem = {
        productId: _id,
        name,
        quantity: 1,
        images,
        material,
        price,
        email: user.email,
      };

      fetch("http://localhost:8080/carts", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(cartItem),
      })
        .then((res) => res.json())
        .then((data) => {
          refetch();
          if (data?.cart) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Item added to cart successfully!",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        })
        .catch((error) => {
          console.error("Error adding to cart:", error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong! Please try again later.",
          });
        });
    } else {
      Swal.fire({
        title: "Authentication Required",
        text: "You need to log in to add items to the cart.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#4682B4",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login Now",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: { from: location } });
        }
      });
    }
  };

  // Handle toggling the wishlist
  const handleToggleWishlist = async () => {
    if (!user || !user.email) {
      Swal.fire({
        title: "Authentication Required",
        text: "You need to log in to wishlist items.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#4682B4",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login Now",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: { from: location } });
        }
      });
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/wishlists/toggle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user.email,
          product: { _id, name, images, material, price },
        }),
      });

      const data = await response.json();
      console.log("Wishlist Toggle Response:", data);

      if (response.ok) {
        setIsLiked((prev) => !prev);

        // Update localStorage
        const savedWishlist = JSON.parse(
          localStorage.getItem("wishlist") || "[]"
        );

        if (isLiked) {
          const updatedWishlist = savedWishlist.filter(
            (itemId) => itemId !== _id
          );
          localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
        } else {
          savedWishlist.push(_id);
          localStorage.setItem("wishlist", JSON.stringify(savedWishlist));
        }

        const message = isLiked ? "Removed from wishlist" : "Added to wishlist";
        refetch1();
        Swal.fire("Success", message, "success");
      } else {
        console.error("Failed to toggle wishlist:", data.message);
      }
    } catch (error) {
      console.error("Error toggling wishlist:", error);
    }
  };

  const fetchWishlistStatus = () => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    if (savedWishlist.includes(_id)) {
      setIsLiked(true);
    }
  };

  useEffect(() => {
    fetchWishlistStatus();
  }, [user, _id]);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x);
  const ySpring = useSpring(y);

  const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

  const transitionToNextImage = () => {
    const nextIndex = (currentImageIndex + 1) % item.images.length;

    if (imageRef.current) {
      gsap.to(imageRef.current, {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          setCurrentImageIndex(nextIndex);
          gsap.to(imageRef.current, { opacity: 1, duration: 0.5 });
        },
      });
    }
  };

  useEffect(() => {
    if (!isHovered) return;

    const interval = setInterval(() => {
      transitionToNextImage();
    }, 3000);

    return () => clearInterval(interval);
  }, [isHovered, currentImageIndex]);

  const handleMouseMove = (e) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = (e.clientX - rect.left) * ROTATION_RANGE;
    const mouseY = (e.clientY - rect.top) * ROTATION_RANGE;

    const rX = (mouseY / height - HALF_ROTATION_RANGE) * -1;
    const rY = mouseX / width - HALF_ROTATION_RANGE;

    x.set(rX);
    y.set(rY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const toggleLike = () => {
    handleToggleWishlist();

    gsap.fromTo(
      ".fa-heart",
      { scale: 0.8 },
      { scale: 1.2, duration: 0.2, ease: "back.out(2)" }
    );
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{
        transformStyle: "preserve-3d",
        transform,
        width,
        height,
      }}
      className="relative rounded-lg bg-white shadow-lg transition-all border-4 border-[#C8E6FF] mt-7"
    >
      {/* Heart Icon */}
      <div
        onClick={toggleLike}
        style={{ transform: "translateZ(50px)" }}
        className={`absolute top-2 right-2 z-20 cursor-pointer p-2 rounded-full transition-all ${
          isLiked ? "text-steelBlue" : "text-gray-400"
        }`}
      >
        <FaHeart className="h-5 w-5 fa-heart" />
      </div>

      {/* Product Image */}
      <div
        className="block overflow-hidden rounded-t-lg"
        style={{ height: imageRatio }}
      >
        <img
          ref={imageRef}
          src={item.images[currentImageIndex]}
          alt={`${item.name} - ${currentImageIndex + 1}`}
          className="h-full w-full object-cover transition-all duration-200 hover:scale-105"
          style={{
            transform: "translateZ(30px)",
          }}
        />
      </div>

      {/* Card Content */}
      <div
        className="p-3 flex flex-col justify-between"
        style={{
          transform: "translateZ(20px)",
          height: `calc(${height} - ${imageRatio})`,
        }}
      >
        <div>
          <h3 className="text-base font-semibold truncate">{item.name}</h3>
          <p className="text-sm text-gray-500 line-clamp-2 truncate">
            {item.description}
          </p>
        </div>
        <div className="flex justify-between items-center mt-2">
          <p className="text-base font-semibold">
            <span className="text-sm text-red-500">$</span>
            {item.price.toFixed(2)}
          </p>
          <button
            className={`text-sm font-medium py-1 px-3 rounded-md transition ${buttonClass}`}
            onClick={() => handleAddtoCart(item)}
          >
            {buttonText}
          </button>
        </div>
        {/* See More Button */}
        <div className="mt-3 flex justify-end">
          <Link
            to={`/products/${item._id}`}
            className="text-m font-medium text-blue-500 opacity-75 hover:underline"
          >
            See More
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default Cards;
