import React, { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";

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
      <img
        src={image}
        alt={title}
        className="h-40 w-full object-cover rounded-t-lg"
        style={{
          transform: "translateZ(50px)",
        }}
      />
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
      image: "https://via.placeholder.com/200x200.png?text=Shelf+1",
    },
    {
      id: 2,
      title: "Industrial Shelf",
      price: 89,
      image: "https://via.placeholder.com/200x200.png?text=Shelf+2",
    },
    {
      id: 3,
      title: "Wooden Shelf",
      price: 79,
      image: "https://via.placeholder.com/200x200.png?text=Shelf+3",
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
            image={shelf.image}
          />
        ))}
      </div>
    </section>
  );
};

export default Popular;
