import React from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";

const ROTATION_RANGE = 15;
const HALF_ROTATION_RANGE = ROTATION_RANGE / 2;

const Company = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between bg-white py-16 px-8 gap-16">
      {/* Left Section: Stats */}
      <div className="flex flex-col gap-4 w-full lg:w-1/2">
        {/* Stat 1 */}
        <TiltCard
          icon="/assets/images/exp1.svg"
          number="123"
          label="Shelves Inserted"
        />
        {/* Stat 2 */}
        <TiltCard
          icon="/assets/images/exp2.svg"
          number="84"
          label="Happy Clients"
        />
        {/* Stat 3 */}
        <TiltCard
          icon="/assets/images/exp3.svg"
          number="37"
          label="Awards Win"
        />
        {/* Stat 4 */}
        <TiltCard
          icon="/assets/images/exp4.svg"
          number="15"
          label="Years in Business"
        />
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
        <button className="btn">Contact Us</button>
      </div>
    </div>
  );
};

// TiltCard Component
const TiltCard = ({ icon, number, label }) => {
  const ref = React.useRef(null);

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
      className="flex items-center bg-white shadow-md rounded-lg p-6 w-[300px] h-[140px] cursor-pointer"
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
        <p className="text-3xl font-bold text-steelBlue">{number}</p>
        <p className="text-charcoal text-sm mt-1">{label}</p>
      </div>
    </motion.div>
  );
};

export default Company;
