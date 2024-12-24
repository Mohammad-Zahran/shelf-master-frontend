import React from "react";
import { TiSocialLinkedinCircular } from "react-icons/ti";
import { CiFacebook } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-steelBlue text-white py-10">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
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
            Hello, we are Lift Media. Our goal is to translate the positive
            effects from revolutionizing how companies engage with their clients
            & their team.
          </p>
          <form>
            <div className="flex items-center">
              <input
                type="email"
                placeholder="Email address"
                className="px-4 py-2 rounded-l-md border-none w-full"
              />
              <button
                type="submit"
                className="bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded-r-md text-white"
              >
                →
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="border-t border-blue-500 mt-8 pt-4 text-sm text-center">
        <div className="flex justify-between items-center flex-wrap">
          {/* Logo */}
          <div>
            <img
              src="/public/assets/images/logo.png"
              alt="Logo"
              className="h-10"
            />
          </div>

          {/* Footer Links */}
          <div className="space-x-4">
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
          <div className="flex space-x-4 text-2xl">
            <a href="#" className="hover:text-gray-300">
              <TiSocialLinkedinCircular />
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
