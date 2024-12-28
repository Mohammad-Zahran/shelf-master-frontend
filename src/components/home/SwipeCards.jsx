import React, { useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import gsap from "gsap";
import useIntersectionObserver from "../../hooks/useIntersectionObserver"; // Import the custom hook
import swipeAudioFile from "../../../public/assets/audios/swipe-236674.mp3";

const SwipeCards = () => {
  const cardsRef = useRef([]);
  const sectionRef = useRef(null);
  const { observe, entries } = useIntersectionObserver({ threshold: 0.3 });

  // Observe cards when the section comes into view
  React.useEffect(() => {
    if (sectionRef.current) {
      const cardElements = Array.from(cardsRef.current);
      observe(cardElements);
    }
  }, [observe]);

  // Trigger animations when cards are in view
  React.useEffect(() => {
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
      className="grid h-[500px] w-full place-items-center bg-white px-4 md:px-8"
    >
      {cardData.map((card, index) => (
        <Card
          key={card.id}
          cards={cardData}
          setCards={() => {}}
          {...card}
          ref={(el) => (cardsRef.current[index] = el)}
        />
      ))}
    </div>
  );
};

const Card = React.forwardRef(({ id, name, review, rating, picture }, ref) => {
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
      className="h-[350px] w-[90%] md:h-[400px] md:w-[500px] lg:w-[550px] bg-white border-2 border-steelBlue rounded-lg shadow-md p-6 md:p-8 flex flex-col space-y-4 md:space-y-6"
      style={{
        gridRow: 1,
        gridColumn: 1,
        x,
        opacity,
        rotate,
        transition: "transform 0.25s cubic-bezier(0.22, 0.61, 0.36, 1)",
        boxShadow: "0 20px 35px -5px rgba(0, 0, 0, 0.7)",
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
          src={picture}
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
        {review}
      </p>
    </motion.div>
  );
});

export default SwipeCards;

// Dummy data for reviews
const cardData = [
  {
    id: 1,
    name: "Rim Zahran",
    review:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium.",
    rating: 4,
    picture: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    id: 2,
    name: "John Doe",
    review:
      "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam.",
    rating: 5,
    picture: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    id: 3,
    name: "Jane Smith",
    review:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
    rating: 3,
    picture: "https://randomuser.me/api/portraits/women/3.jpg",
  },
  {
    id: 4,
    name: "Alice Brown",
    review:
      "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.",
    rating: 5,
    picture: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    id: 5,
    name: "Bob Johnson",
    review:
      "Neque porro quisquam est qui dolorem ipsum quia voluptas sit amet, consectetur, adipisci velit.",
    rating: 4,
    picture: "https://randomuser.me/api/portraits/men/5.jpg",
  },
];
