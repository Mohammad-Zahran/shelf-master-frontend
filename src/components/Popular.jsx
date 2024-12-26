import React, { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { CiHeart } from "react-icons/ci";

const ROTATION_RANGE = 32.5;
const HALF_ROTATION_RANGE = 32.5 / 2;

const TiltCard = ({ title, price, image }) => {
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x);
  const ySpring = useSpring(y);

  const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

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
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        transform,
      }}
      className="relative h-80 w-60 rounded-lg bg-white shadow-md transition-all"
    >
      {/* Heart Icon */}
      <div
        style={{ transform: "translateZ(75px)" }}
        className="absolute top-2 right-2 text-xl text-gray-500 hover:text-steelBlue cursor-pointer"
      >
        <CiHeart />
      </div>
      {/* Image */}
      <img
        src={image}
        alt={title}
        className="h-40 w-full object-cover rounded-t-lg"
        style={{
          transform: "translateZ(50px)",
        }}
      />
      {/* Content */}
      <div
        className="p-4"
        style={{
          transform: "translateZ(25px)",
        }}
      >
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-gray-500">${price}</p>
        <button className="mt-3 btn">Add to Cart</button>
      </div>
    </motion.div>
  );
};

export default TiltCard;
