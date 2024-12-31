import React, { useRef, useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { FaHeart } from "react-icons/fa";
import { gsap } from "gsap";
import { AuthContext } from "../../contexts/AuthProvider";

const ROTATION_RANGE = 20;
const HALF_ROTATION_RANGE = ROTATION_RANGE / 2;

const Cards = ({
  item,
  width = "320px",
  height = "420px",
  imageRatio = "70%", // Customize image height ratio
  buttonText = "Add to Cart", // Customize button text
  buttonClass = "bg-steelBlue text-white hover:bg-transparent border border-transparent hover:border hover:text-steelBlue hover:border-steelBlue", // Button styling
}) => {
  const { _id, name, images, price } = item;
  const ref = useRef(null);
  const imageRef = useRef(null);
  const [isLiked, setIsLiked] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const { user } = useContext(AuthContext);
  // console.log(user)

  // add to cart btn
  const handleAddtoCart = (item) => {
    console.log("btn is clicked", item);
    if (user && user?.email) {
      const cartItem = {
        productId: _id, 
        name,
        quantity: 1,
        images,
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
          console.log(data);
        });
    }
  };

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x);
  const ySpring = useSpring(y);

  const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

  useEffect(() => {
    if (!isHovered) return;

    const interval = setInterval(() => {
      transitionToNextImage();
    }, 3000);

    return () => clearInterval(interval);
  }, [isHovered, currentImageIndex]);

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
    setIsLiked(!isLiked);
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
      className="relative rounded-lg bg-white shadow-lg transition-all border-4 border-blue-300 mt-7"
    >
      <div
        onClick={toggleLike}
        style={{ transform: "translateZ(50px)" }}
        className={`absolute top-2 right-2 z-10 cursor-pointer p-2 rounded-full transition-all ${
          isLiked ? "text-red-500" : "text-gray-400"
        }`}
      >
        <FaHeart className="h-5 w-5" />
      </div>
      <Link
        to={`/product/${item._id}`}
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
      </Link>
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
      </div>
    </motion.div>
  );
};

export default Cards;
