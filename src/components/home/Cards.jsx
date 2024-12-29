import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { FaHeart } from "react-icons/fa";
import { gsap } from "gsap";

const ROTATION_RANGE = 32.5;
const HALF_ROTATION_RANGE = 32.5 / 2;

const Cards = ({ item }) => {
  const ref = useRef(null);
  const imageRef = useRef(null);
  const [isLiked, setIsLiked] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

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
      }}
      className="relative h-[550px] w-[352px] rounded-lg bg-white shadow-xl transition-all border border-[#C8E6FF]"
    >
      <div
        onClick={toggleLike}
        style={{ transform: "translateZ(75px)" }}
        className={`absolute top-2 right-2 z-10 cursor-pointer p-2 rounded-full transition-all ${
          isLiked ? "text-steelBlue" : "text-steelBlue"
        }`}
      >
        <FaHeart className="h-6 w-6" />
      </div>
      <Link
        to={`/product/${item._id}`}
        className="block h-[400px] overflow-hidden rounded-t-lg"
      >
        <img
          ref={imageRef}
          src={item.images[currentImageIndex]}
          alt={`${item.name} - ${currentImageIndex + 1}`}
          className="h-full w-full object-cover transition-all duration-200 hover:scale-105"
          style={{
            transform: "translateZ(50px)",
          }}
        />
      </Link>
      <div
        className="p-4 flex flex-col justify-between h-[120px]"
        style={{
          transform: "translateZ(25px)",
        }}
      >
        <div>
          <h3 className="text-lg font-semibold">{item.name}</h3>
          <p className="text-sm text-gray-500 line-clamp-2">
            {item.description}
          </p>
        </div>
        <div className="flex justify-between items-center mt-2">
          <p className="text-lg font-semibold">
            <span className="text-sm text-red-500">$</span>
            {item.price.toFixed(2)}
          </p>
          <button className="btn bg-steelBlue text-white hover:bg-transparent border border-transparent hover:border hover:text-steelBlue hover:border-steelBlue">Add to Cart</button>
        </div>
      </div>
    </motion.div>
  );
};

export default Cards;
