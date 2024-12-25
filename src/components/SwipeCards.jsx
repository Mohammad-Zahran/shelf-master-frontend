import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import gsap from "gsap";

const SwipeCards = () => {
  const [cards, setCards] = useState(cardData);
  const cardsRef = useRef([]);

  // GSAP animation for card stack on mount
  useEffect(() => {
    if (cardsRef.current.length) {
      gsap.fromTo(
        cardsRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power3.out" }
      );
    }
  }, []);

  return (
    <div className="grid h-[500px] w-full place-items-center bg-white">
      {cards.map((card, index) => (
        <Card
          key={card.id}
          cards={cards}
          setCards={setCards}
          {...card}
          ref={(el) => (cardsRef.current[index] = el)}
        />
      ))}
    </div>
  );
};

const Card = React.forwardRef(({ id, name, review, rating, picture, setCards, cards }, ref) => {
  const x = useMotionValue(0);
  const rotateRaw = useTransform(x, [-150, 150], [-18, 18]);
  const opacity = useTransform(x, [-150, 0, 150], [0, 1, 0]);

  const isFront = id === cards[cards.length - 1].id;

  const rotate = useTransform(() => {
    const offset = isFront ? 0 : id % 2 ? 6 : -6;
    return `${rotateRaw.get() + offset}deg`;
  });

  const handleDragEnd = (_, info) => {
    if (Math.abs(info.offset.x) > 100) {
      setCards((prevCards) => prevCards.filter((v) => v.id !== id));
    }
  };

  // GSAP animation for individual card
  useEffect(() => {
    if (ref.current) {
      gsap.fromTo(
        ref.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
      );
    }
  }, [ref]);

  return (
    <motion.div
      ref={ref}
      className="h-[300px] w-[400px] bg-white rounded-lg shadow-md p-4 flex flex-col items-center"
      style={{
        gridRow: 1,
        gridColumn: 1,
        x,
        opacity,
        rotate,
        transition: "0.125s transform",
        boxShadow: isFront
          ? "0 20px 35px -5px rgba(0, 0, 0, 0.7), 0 10px 15px -6px rgba(0, 0, 0, 0.5)"
          : "0 5px 10px rgba(0, 0, 0, 0.3)",
      }}
      animate={{
        scale: isFront ? 1 : 0.98,
      }}
      drag="x"
      dragConstraints={{ left: -300, right: 300 }}
      onDragEnd={handleDragEnd}
    >
      <img
        src={picture}
        alt={name}
        className="w-16 h-16 rounded-full mb-4"
      />
      <h3 className="font-bold text-lg">{name}</h3>
      <p className="text-yellow-500">
        {"★".repeat(rating) + "☆".repeat(5 - rating)}
      </p>
      <p className="text-gray-600 text-sm text-center mt-2">{review}</p>
    </motion.div>
  );
});

export default SwipeCards;

// Dummy data for reviews
const cardData = [
  {
    id: 1,
    name: "Rim Zahran",
    review: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium.",
    rating: 4,
    picture: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    id: 2,
    name: "John Doe",
    review: "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam.",
    rating: 5,
    picture: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    id: 3,
    name: "Jane Smith",
    review: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
    rating: 3,
    picture: "https://randomuser.me/api/portraits/women/3.jpg",
  },
  {
    id: 4,
    name: "Alice Brown",
    review: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.",
    rating: 5,
    picture: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    id: 5,
    name: "Bob Johnson",
    review: "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.",
    rating: 4,
    picture: "https://randomuser.me/api/portraits/men/5.jpg",
  },
];
