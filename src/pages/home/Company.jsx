import React, { useEffect, useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { gsap } from "gsap";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";

const ROTATION_RANGE = 15;
const HALF_ROTATION_RANGE = ROTATION_RANGE / 2;

const Company = () => {
  const sectionRef = useRef(null);
  const { observe, entries } = useIntersectionObserver({ threshold: 0.3 });

  useEffect(() => {
    if (sectionRef.current) {
      const cards = Array.from(
        sectionRef.current.querySelectorAll(".tilt-card")
      );
      observe(cards);
    }
  }, [observe]);

  useEffect(() => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        gsap.fromTo(
          entry.target,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: index * 0.2,
            ease: "power3.out",
            onStart: () => {
              const numberElement =
                entry.target.querySelector(".increment-number");
              if (numberElement) {
                gsap.fromTo(
                  numberElement,
                  { textContent: 0 },
                  {
                    textContent: numberElement.getAttribute("data-number"),
                    duration: 2,
                    ease: "power3.out",
                    snap: { textContent: 1 },
                    onUpdate: function () {
                      numberElement.textContent = Math.floor(
                        this.targets()[0].textContent
                      );
                    },
                  }
                );
              }
            },
          }
        );
      }
    });
  }, [entries]);

  return (
    <div
      ref={sectionRef}
      className="flex flex-col lg:flex-row items-center justify-between bg-white py-16 px-8 gap-16 relative"
    >
      {/* Left Section: Stats */}
      <div className="flex flex-col items-center w-full lg:w-1/2 relative">
        {/* Vertical Line */}
        <div className="absolute h-full w-[2px] bg-gray-300 left-1/2 -translate-x-1/2 hidden lg:block"></div>

        <div className="flex flex-col items-start lg:flex-row lg:items-center gap-4 relative z-10">
          <TiltCard
            icon="/assets/images/exp1.svg"
            number={123}
            label="Shelves Inserted"
            additionalStyles="lg:translate-x-6"
          />
          <TiltCard
            icon="/assets/images/exp2.svg"
            number={84}
            label="Happy Clients"
            additionalStyles="lg:translate-y-[100px] lg:-translate-x-6"
          />
        </div>

        <div className="flex flex-col items-start lg:flex-row lg:items-center gap-4 relative z-10 mt-6 lg:mt-12">
          <TiltCard
            icon="/assets/images/exp3.svg"
            number={37}
            label="Awards Win"
            additionalStyles="lg:translate-x-6"
          />
          <TiltCard
            icon="/assets/images/exp4.svg"
            number={15}
            label="Years in Business"
            additionalStyles="lg:translate-y-[-100px] lg:-translate-x-6"
          />
        </div>
      </div>

      {/* Right Section: Experience Text */}
      <div className="flex flex-col items-start text-left w-full lg:w-1/2">
        <h1 className="text-4xl font-bold text-steelBlue mb-4">
          15 Years Experience
        </h1>
        <p className="text-charcoal text-lg mb-6">
          Our company has been the leading provider of construction services to
          clients throughout the Lebanon since 2015.
        </p>
        <button className="btn normal">Contact Us</button>
      </div>
    </div>
  );
};

// TiltCard Component
const TiltCard = ({ icon, number, label, additionalStyles }) => {
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x, { stiffness: 200, damping: 20 });
  const ySpring = useSpring(y, { stiffness: 200, damping: 20 });

  const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

  const handleMouseMove = (e) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const mouseX = (e.clientX - rect.left) * ROTATION_RANGE;
    const mouseY = (e.clientY - rect.top) * ROTATION_RANGE;

    const rX = (mouseY / rect.height - HALF_ROTATION_RANGE) * -1;
    const rY = mouseX / rect.width - HALF_ROTATION_RANGE;

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
      className={`tilt-card flex items-center bg-white shadow-md rounded-lg p-6 w-[300px] h-[140px] cursor-pointer ${additionalStyles}`}
    >
      <img
        src={icon}
        alt={label}
        className="w-16 h-16 mr-4"
        style={{
          transform: "translateZ(50px)",
        }}
      />
      <div
        style={{
          transform: "translateZ(40px)",
        }}
      >
        <p
          className="increment-number text-3xl font-bold text-steelBlue"
          data-number={number}
        >
          0
        </p>
        <p className="text-charcoal text-sm mt-1">{label}</p>
      </div>
    </motion.div>
  );
};

export default Company;
