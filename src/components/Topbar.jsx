import React from "react";

const Topbar = () => {
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
        <div className="text-lg font-semibold">Admin Dashboard</div>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-4 flex-grow justify-end px-6">
        {/* Search Box */}
        <input
          type="text"
          placeholder="Search"
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-200"
        />
        {/* User Profile */}
        <div className="flex items-center space-x-2">
          <img
            src="https://via.placeholder.com/40" // Replace with a profile image URL
            alt="User"
            className="w-10 h-10 rounded-full"
          />
          <span className="font-medium">User Name</span>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
