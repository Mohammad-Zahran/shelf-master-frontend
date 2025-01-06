import React from "react";
import {
  FaFacebookF,
  FaGithub,
  FaGoogle,
  FaPhoneVolume,
} from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";

const ContactUs = () => {
  return (
    <div className="max-w-screen-xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-center mb-12">Contact Us</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Information Section */}
        <div className="bg-steelBlue text-white p-8 rounded-lg shadow-md">
          <h2 className="text-4xl font-semibold mb-4">Contact Information</h2>
          <p className="mb-6 text-xl text-[#C9C9C9]">
            Say something to start a live chat!
          </p>
          <div className="mt-36">
            <ul className="space-y-12">
              <li className="flex items-center space-x-4 text-xl">
                <span className="material-icons">
                  <FaPhoneVolume />
                </span>
                <span>+1012 3456 789</span>
              </li>
              <li className="flex items-center space-x-4 text-xl">
                <span className="material-icons">
                  <MdEmail />
                </span>
                <span>demo@gmail.com</span>
              </li>
              <li className="flex items-center space-x-4 text-xl">
                <span className="material-icons mb-7">
                  <FaLocationDot />
                </span>
                <span>
                  132 Dartmouth Street Boston, Massachusetts 02156 United States
                </span>
              </li>
            </ul>
          </div>
          <div className="mt-36 flex justify-start gap-5 ">
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
        <div className="bg-white p-8 rounded-lg shadow-md">
          <form>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="firstName" className="block text-gray-700 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  className="w-full p-3 border border-gray-300 rounded-lg"
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
                  className="w-full p-3 border border-gray-300 rounded-lg"
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
                className="w-full p-3 border border-gray-300 rounded-lg"
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
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Your Phone Number"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="subject" className="block text-gray-700 mb-2">
                Select Subject
              </label>
              <select
                id="subject"
                className="w-full p-3 border border-gray-300 rounded-lg"
              >
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
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Write your message..."
                rows="5"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
