import { useQuery } from "@tanstack/react-query";
import React, { useState, useEffect, useRef } from "react";
import { FaRegTrashAlt, FaUsers, FaFilePdf } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import jsPDF from "jspdf";
import "jspdf-autotable";
import gsap from "gsap";

const Users = () => {
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch(`http://localhost:8080/users`);
      if (!res.ok) {
        throw new Error("Failed to fetch users");
      }
      return res.json();
    },
  });

  const totalPages = Math.ceil(users.length / usersPerPage);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const filteredUsers = users
    .filter((user) => {
      return (
        (!filterRole || user.role === filterRole) &&
        (user.name.toLowerCase().includes(search.toLowerCase()) ||
          user.email.toLowerCase().includes(search.toLowerCase()))
      );
    })
    .slice((currentPage - 1) * usersPerPage, currentPage * usersPerPage);

  // PDF Export
  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Users List", 14, 10);
    doc.autoTable({
      head: [["Name", "Email", "Role"]],
      body: users.map((user) => [user.name, user.email, user.role]),
    });
    doc.save("users-list.pdf");
  };

  // GSAP Animation Refs
  const containerRef = useRef(null);
  const tableRef = useRef(null);

  useEffect(() => {
    // Set default hidden styles for elements
    const rows = tableRef.current.querySelectorAll("tbody tr");
    gsap.set(containerRef.current, { opacity: 0, scale: 0.9 });
    gsap.set(rows, { opacity: 0, x: -50 });

    // Delay to ensure the DOM is fully rendered before animation
    setTimeout(() => {
      // Container animation: fade in with scaling
      gsap.to(containerRef.current, {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "power3.out",
      });

      // Table row animation: slide in from left
      gsap.to(rows, {
        opacity: 1,
        x: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
      });
    }, 100); // Small delay
  }, [filteredUsers]);

  return (
    <div ref={containerRef}>
      <div className="flex items-center justify-between mx-4 my-4">
        <h5 className="text-lg font-bold">All Users</h5>
        <div className="flex items-center gap-3">
          <button
            onClick={handleDownloadPDF}
            className="btn normal btn-outline flex items-center gap-2"
          >
            <FaFilePdf className="text-red-500" />
            Download PDF
          </button>
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered pr-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <IoSearchOutline className="absolute top-2/4 right-3 -translate-y-2/4 text-gray-500 text-xl" />
          </div>
          <div>
            <select
              className="select select-bordered flex items-center gap-2"
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
            >
              <option value="">All Roles</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra" ref={tableRef}>
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          alt="User Avatar"
                          src={
                            user.photoURL ||
                            "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                          }
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user.name}</div>
                    </div>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>
                  {user.role === "admin" ? (
                    "Admin"
                  ) : (
                    <button className="btn btn-circle btn-sm bg-steelBlue text-white">
                      <FaUsers />
                    </button>
                  )}
                </td>
                <th>
                  <button className="btn btn-ghost btn-lg text-[#959595]">
                    <FaRegTrashAlt />
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-4 gap-2">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`btn-sm btn-circle ${
              currentPage === page
                ? "btn-active bg-steelBlue text-white"
                : "btn-outline"
            }`}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Users;
