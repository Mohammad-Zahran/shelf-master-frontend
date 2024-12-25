import React, { useState, useEffect, useRef } from "react";
import { IoIosArrowForward } from "react-icons/io"; // Import the arrow icon
import gsap from "gsap";

const FAQ = () => {
  const faqs = [
    {
      question: "What is Shelf Master?",
      answer:
        "Shelf Master is a platform designed to help you manage your business operations effectively.",
    },
    {
      question: "Should I pay instantly?",
      answer:
        "No, you do not need to pay instantly. With one of the lowest transaction charges in the industry, you pay only when you get paid!",
    },
    {
      question: "Does ACME provide international payments support?",
      answer:
        "Yes, ACME supports international payments with low transaction fees and fast processing times.",
    },
    {
      question:
        "Is there any setup fee or annual maintenance fee that I need to pay regularly?",
      answer:
        "No, there are no setup or annual maintenance fees. You only pay a small fee per transaction.",
    },
  ];

  const [selectedIndex, setSelectedIndex] = useState(null);
  const answerRef = useRef(null);
  const faqRef = useRef(null);

  const handleSelect = (index) => {
    setSelectedIndex(index);

    gsap.fromTo(
      faqRef.current,
      { scale: 1 },
      { scale: 1.05, duration: 0.2, yoyo: true, repeat: 1, ease: "power2.out" }
    );
  };

  useEffect(() => {
    if (selectedIndex !== null) {
      gsap.fromTo(
        answerRef.current,
        { x: -50, opacity: 0, scale: 0.95 },
        { x: 0, opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" }
      );
    }
  }, [selectedIndex]);

  return (
    <section className="bg-white py-12 px-4">
      <div className="text-center py-8">
        <p className="text-steelBlue text-lg"> See the most asked questions in the community</p>
        <h1 className="text-4xl md:text-5xl font-bold text-charcoal">Frequentley Asked Questions</h1>
      </div>
    </section>
  );
};

export default FAQ;
