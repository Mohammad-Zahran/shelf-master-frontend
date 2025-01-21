import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import {
  FaFacebookF,
  FaGithub,
  FaGoogle,
  FaPhoneVolume,
} from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import useAxiosPublic from "../hooks/useAxiosPublic";

const ContactUs = () => {
  const axiosPublic = useAxiosPublic(); // Use the custom Axios instance

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  // Refs for animation
  const contactInfoRef = useRef(null);
  const formRef = useRef(null);
  const titleRef = useRef(null);

  // GSAP Animation
  useEffect(() => {
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );

    gsap.fromTo(
      contactInfoRef.current,
      { opacity: 0, x: -100 },
      { opacity: 1, x: 0, duration: 1, ease: "power3.out", delay: 0.5 }
    );

    gsap.fromTo(
      formRef.current,
      { opacity: 0, x: 100 },
      { opacity: 1, x: 0, duration: 1, ease: "power3.out", delay: 0.5 }
    );
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailData = {
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
    };

    try {
      setStatus("Sending...");
      const response = await axiosPublic.post("/send-email", emailData); // Use axiosPublic
      if (response.data.success) {
        setStatus("Email sent successfully!");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        setStatus("Failed to send email.");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      setStatus("Failed to send email.");
    }
  };

  return (
    <div className="relative max-w-screen-xl mx-auto px-6 py-16">
      <h1
        ref={titleRef}
        className="text-4xl font-bold text-center mb-12 text-charcoal"
      >
        Contact Us
      </h1>
      <p
        ref={titleRef}
        className="text-xl font-semibold text-center mb-12 text-[#717171]"
      >
        Any question or remarks? Just write us a message!
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Information Section */}
        <div
          ref={contactInfoRef}
          className="relative bg-steelBlue text-white p-8 rounded-lg shadow-md overflow-hidden"
        >
          {/* Background Circles */}
          <div className="absolute -bottom-10 -right-3 w-72 h-72 bg-gray-400 rounded-full opacity-30"></div>
          <div className="absolute -bottom-20 -right-32 w-72 h-72 bg-black rounded-full opacity-100"></div>

          <h2 className="text-4xl font-semibold mb-4">Contact Information</h2>
          <p className="mb-6 text-xl text-[#C9C9C9]">
            Say something to start a live chat!
          </p>
          <ul className="space-y-12">
            <li className="flex items-center space-x-4 text-xl">
              <span className="material-icons">
                <FaPhoneVolume />
              </span>
              <span>+961 76 749 822</span>
            </li>
            <li className="flex items-center space-x-4 text-xl">
              <span className="material-icons">
                <MdEmail />
              </span>
              <span>zahranmohammad30@gmail.com</span>
            </li>
            <li className="flex items-center space-x-4 text-xl">
              <span className="material-icons">
                <FaLocationDot />
              </span>
              <span>Beirut Lebanon, Jnah Sea Line in front of the</span>
            </li>
          </ul>
          <div className="mt-12 flex justify-start gap-5">
            <button className="rounded-full border border-white p-2">
              <FaGoogle />
            </button>
            <button className="rounded-full border border-white p-2">
              <FaFacebookF />
            </button>
            <button className="rounded-full border border-white p-2">
              <FaGithub />
            </button>
          </div>
        </div>

        {/* Form Section */}
        <div ref={formRef} className="bg-white p-8 rounded-lg shadow-md">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="firstName" className="block text-gray-700 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-steelBlue transition duration-300"
                  placeholder="First Name"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-gray-700 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-steelBlue transition duration-300"
                  placeholder="Last Name"
                />
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="email" className="block text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-steelBlue transition duration-300"
                placeholder="Your Email"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="phone" className="block text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="text"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-steelBlue transition duration-300"
                placeholder="Your Phone Number"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="subject" className="block text-gray-700 mb-2">
                Select Subject
              </label>
              <select
                id="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-steelBlue transition duration-300"
              >
                <option value="">Select Subject</option>
                <option>General Inquiry</option>
                <option>Support</option>
                <option>Feedback</option>
              </select>
            </div>

            <div className="mb-6">
              <label htmlFor="message" className="block text-gray-700 mb-2">
                Message
              </label>
              <textarea
                id="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-steelBlue transition duration-300"
                placeholder="Write your message..."
                rows="5"
              ></textarea>
            </div>

            <button type="submit" className="w-full btn normal">
              Send Message
            </button>
            {status && (
              <p className="mt-4 text-center text-gray-600">{status}</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
