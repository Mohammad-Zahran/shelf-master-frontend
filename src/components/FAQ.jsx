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

    
  }
  return <div>FAQ</div>;
};

export default FAQ;
