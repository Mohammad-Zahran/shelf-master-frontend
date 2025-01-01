import React from "react";
import { Link, Outlet } from "react-router-dom";
import Topbar from "../components/Topbar"; // Import the Topbar component

const DashboardLayout = () => {
  return (
    <div>
      <Topbar /> {/* Add the Topbar component here */}
      <div className="flex">
        {/* Sidebar */}
        <div className="bg-[#F1F2F7] min-h-screen w-80 p-4">
          <ul className="menu text-base-content">
            <li className="admin-hover">
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li className="admin-hover">
              <Link to={"/dashboard/users"}>All Users</Link>
            </li>
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
