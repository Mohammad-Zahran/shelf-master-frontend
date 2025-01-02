import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { FaRegTrashAlt, FaUsers } from "react-icons/fa";
import jsPDF from "jspdf";
import "jspdf-autotable";

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

  // Filter and Search Logic
  const filteredUsers = users
    .filter((user) => {
      return (
        (!filterRole || user.role === filterRole) &&
        (user.name.toLowerCase().includes(search.toLowerCase()) ||
          user.email.toLowerCase().includes(search.toLowerCase()))
      );
    })
    .slice(
      (currentPage - 1) * usersPerPage,
      currentPage * usersPerPage
    );

  const totalPages = Math.ceil(users.length / usersPerPage);

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

  return (
    <div>
      <div className="flex items-center justify-between mx-4 my-4">
        <h5>All Users</h5>
        <button
          onClick={handleDownloadPDF}
          className="btn btn-primary"
        >
          Download PDF
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center justify-between mx-4 mb-4 gap-4">
        <input
          type="text"
          placeholder="Search by name or email"
          className="input input-bordered w-full max-w-xs"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="select select-bordered"
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
        >
          <option value="">All Roles</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra">
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
      <div className="flex justify-between items-center mx-4 mt-4">
        <div>
          Page {currentPage} of {totalPages}
        </div>
        <div className="btn-group">
          <button
            className="btn"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            className="btn"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Users;
