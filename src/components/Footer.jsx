import React from "react";
import { FaLinkedinIn } from "react-icons/fa";
import { CiFacebook } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-steelBlue text-white py-10">
      {/* Top Section */}
      <div className="container mx-auto px-4 max-w-screen-xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Column 1: Product Section */}
        <div>
          <h3 className="font-bold text-lg mb-4">Product</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:underline block">
                Employee database
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline block">
                Payroll
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline block">
                Absences
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline block">
                Time tracking
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline block">
                Shift planner
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline block">
                Recruiting
              </a>
            </li>
          </ul>
        </div>

        {/* Column 2: Information Section */}
        <div>
          <h3 className="font-bold text-lg mb-4">Information</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:underline block">
                FAQ
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline block">
                Blog
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline block">
                Support
              </a>
            </li>
          </ul>
        </div>

        {/* Column 3: Company Section */}
        <div>
          <h3 className="font-bold text-lg mb-4">Company</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:underline block">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline block">
                Careers
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline block">
                Contact
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline block">
                Lift Media
              </a>
            </li>
          </ul>
        </div>

        {/* Column 4: Subscribe Section */}
        <div>
          <h3 className="font-bold text-lg mb-4">Subscribe</h3>
          <p className="mb-4">
            Hello, we are ShelfMaster. Our goal is to translate the shelf for
            our customers the best way possible
          </p>
          <form>
            <div className="flex flex-wrap md:flex-nowrap items-center">
              <input
                type="email"
                placeholder="Email address"
                className="px-4 py-2 rounded-l-md text-black border-none w-full md:w-auto flex-1 mb-4 md:mb-0"
              />
              <button
                type="submit"
                className="bg-blue-300 text-white hover:bg-blue-500  px-4 py-2 rounded-r-md w-full md:w-auto"
              >
                →
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="border-t border-white-500 mt-8 pt-4 text-sm text-center">
        <div className="flex flex-wrap justify-around items-center gap-6">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img
              src="/public/assets/images/logo.png"
              alt="Logo"
              className="h-10 mx-auto md:mx-0"
            />
          </div>

          {/* Footer Links */}
          <div className="space-x-4 flex-shrink-0">
            <a href="#" className="hover:underline">
              Terms
            </a>
            <a href="#" className="hover:underline">
              Privacy
            </a>
            <a href="#" className="hover:underline">
              Cookies
            </a>
          </div>

          {/* Social Media Icons */}
          <div className="flex justify-start md:justify-center space-x-4 flex-wrap text-2xl md:pl-4">
            <a href="#" className="hover:text-gray-300">
              <FaLinkedinIn />
            </a>
            <a href="#" className="hover:text-gray-300">
              <CiFacebook />
            </a>
            <a href="#" className="hover:text-gray-300">
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
