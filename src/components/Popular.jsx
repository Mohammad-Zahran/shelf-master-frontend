import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { CiHeart } from "react-icons/ci";

const ROTATION_RANGE = 32.5;
const HALF_ROTATION_RANGE = 32.5 / 2;

const TiltCard = ({ title, price, images }) => {
  const ref = useRef(null);
  const [isLiked, setIsLiked] = useState(false); // Track the "liked" state
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Track the current image
  const [isHovered, setIsHovered] = useState(false); // Track hover state

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x);
  const ySpring = useSpring(y);

  const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

  useEffect(() => {
    if (!isHovered) return; // Start interval only when hovered

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount or hover end
  }, [isHovered, images.length]);

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
    setIsHovered(false); // Stop image change when mouse leaves
  };

  const handleMouseEnter = () => {
    setIsHovered(true); // Start image change on hover
  };

  const toggleLike = () => {
    setIsLiked(!isLiked); // Toggle the "liked" state
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
      className="relative h-[400px] w-[352px] rounded-lg bg-white shadow-md transition-all"
    >
      {/* Heart Icon */}
      <div
        onClick={toggleLike}
        style={{ transform: "translateZ(75px)" }}
        className={`absolute top-2 right-2 text-xl cursor-pointer transition-all ${
          isLiked
            ? "text-red-500 drop-shadow-[0_0_10px_rgba(255,0,0,0.8)]"
            : "text-gray-500"
        }`}
      >
        <CiHeart />
      </div>
      {/* Image Carousel */}
      <div className="relative h-[200px] w-full overflow-hidden rounded-t-lg">
        <img
          src={images[currentImageIndex]}
          alt={`${title} - ${currentImageIndex + 1}`}
          className="h-full w-full object-cover"
          style={{
            transform: "translateZ(50px)",
          }}
        />
      </div>
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


const Popular = () => {
    const shelves = [
      {
        id: 1,
        title: "Heavy Duty Shelf",
        price: 99,
        images: [
          "/assets/images/image.png",
          "/assets/images/image (1).png",
          "/assets/images/image (2).png",
        ],
      },
      {
        id: 2,
        title: "Industrial Shelf",
        price: 89,
        images: [
          "https://via.placeholder.com/352x200.png?text=Shelf+2+Image+1",
          "https://via.placeholder.com/352x200.png?text=Shelf+2+Image+2",
          "https://via.placeholder.com/352x200.png?text=Shelf+2+Image+3",
        ],
      },
      {
        id: 3,
        title: "Wooden Shelf",
        price: 79,
        images: [
          "https://via.placeholder.com/352x200.png?text=Shelf+3+Image+1",
          "https://via.placeholder.com/352x200.png?text=Shelf+3+Image+2",
          "https://via.placeholder.com/352x200.png?text=Shelf+3+Image+3",
        ],
      },
    ];
  
    return (
      <section className="scrim-max-width py-10">
        <h2 className="section-heading text-center mb-10">Popular Shelves</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {shelves.map((shelf) => (
            <TiltCard
              key={shelf.id}
              title={shelf.title}
              price={shelf.price}
              images={shelf.images}
            />
          ))}
        </div>
      </section>
    );
  };
  
  export default Popular;
  