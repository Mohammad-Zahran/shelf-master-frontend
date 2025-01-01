import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";

const Topbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="flex items-center justify-between shadow-md border-b border-gray-300" style={{ height: "60px" }}>
      {/* Left Section with Background Color */}
      <div
        className="flex items-center px-4"
        style={{
          backgroundColor: "#F1F2F7",
          height: "100%",
          minWidth: "320px", // Adjust the width to match the sidebar
        }}
      >
        {/* Logo */}
        <img
          src="/assets/images/logotxt.png" // Path to the logo inside the public folder
          alt="Logo"
          className="h-12 mr-3" // Adjust height and margin as needed
        />
        <div className="text-lg font-semibold">Admin Dashboard</div>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-4 flex-grow justify-between px-6">
        {/* Search Box */}
        <div className="relative flex items-center flex-grow max-w-[500px]">
          <input
            type="text"
            placeholder="Search"
            className="border border-gray-300 rounded-lg px-4 py-2 pl-10 focus:outline-none focus:ring focus:ring-blue-200 w-full"
          />
          <IoSearch className="absolute left-3 text-gray-400 text-lg" />
        </div>

        {/* User Profile with Dropdown */}
        <div className="relative">
          <div
            onClick={toggleDropdown}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <img
              src="https://via.placeholder.com/40" // Replace with a profile image URL
              alt="User"
              className="w-10 h-10 rounded-full"
            />
            <span className="font-medium">User Name</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-10">
              <button
                onClick={() => alert("Logout clicked!")} // Replace with logout logic
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Topbar;
