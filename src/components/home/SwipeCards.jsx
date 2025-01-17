import React, { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import gsap from "gsap";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import swipeAudioFile from "../../../public/assets/audios/swipe-236674.mp3";
import { IoReload } from "react-icons/io5";

const SwipeCards = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const cardsRef = useRef([]);
  const sectionRef = useRef(null);
  const { observe, entries } = useIntersectionObserver({ threshold: 0.3 });
  const axiosPublic = useAxiosPublic();

  // Fetch reviews from the backend
  const fetchReviews = async () => {
    setLoading(true);
    try {
      const response = await axiosPublic.get("/testimonials/all");
      setReviews(response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [axiosPublic]);

  // Observe cards when the section comes into view
  useEffect(() => {
    if (sectionRef.current) {
      const cardElements = Array.from(cardsRef.current);
      observe(cardElements);
    }
  }, [observe]);

  // Trigger animations when cards are in view
  useEffect(() => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        gsap.fromTo(
          entry.target,
          { y: 30, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            delay: index * 0.15,
            ease: "power2.out",
          }
        );
      }
    });
  }, [entries]);

  return (
    <div
      ref={sectionRef}
      className="flex flex-col items-center w-full bg-white px-4 md:px-8"
    >
      <div className="grid h-[500px] w-full place-items-center">
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : reviews.length > 0 ? (
          reviews.map((review, index) => (
            <Card
              key={review._id || index}
              {...review}
              ref={(el) => (cardsRef.current[index] = el)}
            />
          ))
        ) : (
          <p className="text-center text-gray-500 mb-4">
            No reviews available.
          </p>
        )}
      </div>

      {/* Reload Button */}
      <button
        onClick={fetchReviews}
        className="btn round bg-steelBlue hover:bg-white text-white hover:text-steelBlue hover:border hover:border-steelBlue"
      >
        <IoReload /> Reload Reviews
      </button>
    </div>
  );
};

const Card = React.forwardRef(({ name, comment, rating, photoURL }, ref) => {
  const x = useMotionValue(0);
  const rotateRaw = useTransform(x, [-150, 150], [-12, 12]);
  const opacity = useTransform(x, [-150, 0, 150], [0, 1, 0]);

  const rotate = useTransform(() => {
    return `${rotateRaw.get()}deg`;
  });

  const swipeAudio = new Audio(swipeAudioFile);

  const handleDragEnd = (_, info) => {
    if (Math.abs(info.offset.x) > 100) {
      // Play swipe audio
      swipeAudio.play();
    }
  };

  return (
    <motion.div
      ref={ref}
      className="h-[350px] w-[90%] md:h-[400px] md:w-[500px] lg:w-[550px] bg-white border-2 border-steelBlue rounded-lg p-6 md:p-8 flex flex-col space-y-4 md:space-y-6"
      style={{
        gridRow: 1,
        gridColumn: 1,
        x,
        opacity,
        rotate,
        transition: "transform 0.25s cubic-bezier(0.22, 0.61, 0.36, 1)",
      }}
      drag="x"
      dragConstraints={{ left: -300, right: 300 }}
      dragTransition={{
        bounceStiffness: 100,
        bounceDamping: 10,
      }}
      onDragEnd={handleDragEnd}
    >
      {/* Top Section: Profile Picture and Name */}
      <div className="flex items-center">
        <img
          src={photoURL || "https://via.placeholder.com/150"}
          alt={name}
          className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover"
        />
        <div className="ml-4 md:ml-6">
          <h3 className="font-bold text-lg md:text-xl">{name}</h3>
          <p className="text-yellow-500 text-lg md:text-2xl">
            {"★".repeat(rating) + "☆".repeat(5 - rating)}
          </p>
        </div>
      </div>
      {/* Review Text */}
      <p className="text-gray-700 text-sm md:text-base leading-relaxed">
        {comment}
      </p>
    </motion.div>
  );
});

export default SwipeCards;
