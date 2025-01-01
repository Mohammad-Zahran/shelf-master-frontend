import React from "react";
import { Link, Outlet } from "react-router-dom";
import Topbar from "../components/Topbar";
import { VscGraph } from "react-icons/vsc";
import { FaUser } from "react-icons/fa";

const DashboardLayout = () => {
  return (
    <div>
      <Topbar /> {/* Add the Topbar component here */}
      <div className="flex flex-col lg:flex-row">
        {/* Sidebar */}
        <div className="bg-[#F1F2F7] min-h-screen w-full lg:w-72 p-4">
          <ul className="menu text-base-content">
            <li className="admin-hover text-lg text-[#273240]">
              <Link to="/dashboard" className="flex items-center space-x-2">
                <VscGraph className="text-steelBlue" />
                <span>Dashboard</span>
              </Link>
            </li>
            <li className="admin-hover text-lg text-[#273240]">
              <Link to="/dashboard/users" className="flex items-center space-x-2">
                <FaUser className="text-steelBlue" />
                <span>Accounts</span>
              </Link>
            </li>
            {/* Additional menu items */}
            {Array(4)
              .fill(null)
              .map((_, i) => (
                <li key={i} className="admin-hover text-lg text-[#273240]">
                  <Link to="/dashboard/users" className="flex items-center space-x-2">
                    <FaUser className="text-steelBlue" />
                    <span>Accounts</span>
                  </Link>
                </li>
              ))}
          </ul>
        </div>

        {/* Main Content */}
        <div className="flex-grow bg-white p-6">
          <Outlet /> {/* Page content */}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
