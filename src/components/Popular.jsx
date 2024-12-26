import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { FaRegHeart } from "react-icons/fa";
import { gsap } from "gsap";

const ROTATION_RANGE = 32.5;
const HALF_ROTATION_RANGE = 32.5 / 2;

const TiltCard = ({ title, price, images }) => {
  const ref = useRef(null);
  const imageRef = useRef(null);
  const [isLiked, setIsLiked] = useState(false); 
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
      transitionToNextImage();
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount or hover end
  }, [isHovered, currentImageIndex]);

  const transitionToNextImage = () => {
    const nextIndex = (currentImageIndex + 1) % images.length;

    // GSAP transition effect
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
      className="relative h-[520px] w-[352px] rounded-lg bg-white shadow-md transition-all border border-[#C8E6FF]"
    >
      {/* Heart Icon */}
      <div
        onClick={toggleLike}
        style={{ transform: "translateZ(75px)" }}
        className={`absolute top-2 right-2 text-3xl cursor-pointer p-2 rounded-full transition-all ${
          isLiked
            ? "bg-steelBlue text-white ring-2 ring-steelBlue"
            : "bg-transparent text-gray-500"
        }`}
      >
        <FaRegHeart />
      </div>
      {/* Image Carousel */}
      <div className="relative h-[400px] w-full overflow-hidden rounded-t-lg">
        <img
          ref={imageRef}
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
        className="p-4 flex justify-between items-center"
        style={{
          transform: "translateZ(25px)",
        }}
      >
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm text-gray-500">${price}</p>
          <a href="#" className="text-steelBlue text-sm underline">
            See More
          </a>
        </div>
        <button className="btn">Add to Cart</button>
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
      {
        id: 4,
        title: "Hey",
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
  