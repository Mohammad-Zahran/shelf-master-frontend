import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
import useAuth from "../hooks/useAuth";

const Topbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, logOut } = useAuth(); // Fetch user information from useAuth

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div
      className="flex flex-col lg:flex-row items-center justify-between shadow-md border-b border-gray-300"
      style={{ height: "auto" }}
    >
      {/* Left Section with Background Color */}
      <a
        href="/"
        className="flex admin-hover items-center w-full lg:w-72 px-4 py-2"
        style={{
          backgroundColor: "#F1F2F7",
        }}
      >
        <img
          src="/assets/images/logotxt.png" // Path to the logo inside the public folder
          alt="Logo"
          className="h-12 mr-3"
        />
        <div className="text-lg font-semibold">Admin Dashboard</div>
      </a>

      {/* Right Section */}
      <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-4 w-full lg:w-auto px-20 lg:ml-auto">
        {/* Search Box */}
        <div className="relative flex items-center w-full max-w-full lg:max-w-[500px]">
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
            {/* Dynamically Display User Profile Picture */}
            <img
              src={user?.photoURL || "https://via.placeholder.com/40"} // Use photoURL or fallback to placeholder
              alt="User"
              className="w-10 h-10 rounded-full"
            />
            <span className="font-medium">{user?.displayName || "User"}</span>{" "}
            {/* Dynamically display the user's name */}
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
                onClick={logOut} // Call the logout function
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
