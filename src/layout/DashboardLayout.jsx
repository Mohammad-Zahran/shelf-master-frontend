import React, { useState, useEffect, useRef } from "react";
import { Link, Outlet } from "react-router-dom";
import Topbar from "../components/Topbar";
import { VscGraph } from "react-icons/vsc";
import { FaUser } from "react-icons/fa";
import { HiMenu } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { IoMdAddCircle } from "react-icons/io";
import Login from "../components/Auth/Login";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";

const DashboardLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Close menu when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const sharedLinks = (
    <>
      {/* Menu Item: Dashboard */}
      <li className="text-lg text-[#273240] hover:text-[#5A6ACF]">
        <Link to="/dashboard" className="flex items-center space-x-2">
          <VscGraph className="text-steelBlue" />
          <span>Dashboard</span>
        </Link>
      </li>

      {/* Menu Item: Accounts */}
      <li className="text-lg text-[#273240] hover:text-[#5A6ACF]">
        <Link to="/dashboard/users" className="flex items-center space-x-2">
          <FaUser className="text-steelBlue" />
          <span>Accounts</span>
        </Link>
      </li>

      {/* Menu Item: Accounts */}
      <li className="text-lg text-[#273240] hover:text-[#5A6ACF]">
        <Link to="/dashboard/users" className="flex items-center space-x-2">
          <IoMdAddCircle className="text-steelBlue" />
          <span>Accounts</span>
        </Link>
      </li>
    </>
  );

  const [isAdmin, isAdminLoading] = useAdmin();
  const { loading } = useAuth();

  return (
    <div>
      {isAdmin ? (
        <div>
          <Topbar />
          <div className="flex flex-col lg:flex-row">
            {/* Sidebar */}
            <div className="hidden lg:block bg-[#F1F2F7] min-h-screen w-full lg:w-72 p-4">
              <ul className="menu text-base-content">{sharedLinks}</ul>
            </div>

            {/* Collapsible Menu for Small Screens */}
            <div className="lg:hidden bg-[#F1F2F7] p-4">
              <button
                onClick={toggleMenu}
                className="text-[#273240] text-2xl hover:text-[#5A6ACF]"
              >
                <HiMenu />
              </button>
              {isMenuOpen && (
                <div
                  ref={menuRef}
                  className="absolute top-16 left-4 right-4 bg-white shadow-lg rounded-lg z-50 p-4"
                >
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-[#273240]">
                      Menu
                    </h2>
                    <button
                      onClick={() => setIsMenuOpen(false)}
                      className="text-2xl text-[#273240] hover:text-[#5A6ACF]"
                    >
                      <IoClose />
                    </button>
                  </div>
                  <ul className="menu text-base-content mt-4">
                    {/* Menu Item: Dashboard */}
                    <li className="text-lg text-[#273240] hover:text-[#5A6ACF]">
                      <Link
                        to="/dashboard"
                        className="flex items-center space-x-2"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <VscGraph className="text-steelBlue" />
                        <span>Dashboard</span>
                      </Link>
                    </li>

                    {/* Menu Item: Accounts */}
                    <li className="text-lg text-[#273240] hover:text-[#5A6ACF]">
                      <Link
                        to="/dashboard/users"
                        className="flex items-center space-x-2"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <FaUser className="text-steelBlue" />
                        <span>Accounts</span>
                      </Link>
                    </li>

                    {/* Additional menu items */}
                    {Array(4)
                      .fill(null)
                      .map((_, i) => (
                        <li
                          key={i}
                          className="text-lg text-[#273240] hover:text-[#5A6ACF]"
                        >
                          <Link
                            to="/dashboard/users"
                            className="flex items-center space-x-2"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            <FaUser className="text-steelBlue" />
                            <span>Accounts</span>
                          </Link>
                        </li>
                      ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Main Content */}
            <div className="flex-grow bg-white p-6">
              <Outlet /> {/* Page content */}
            </div>
          </div>
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default DashboardLayout;
