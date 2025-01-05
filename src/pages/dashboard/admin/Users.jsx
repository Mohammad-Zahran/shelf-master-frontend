import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useRef } from "react";
import { FaRegTrashAlt, FaUsers, FaFilePdf } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import gsap from "gsap";
import { useSearch } from "../../../hooks/useSearch";
import { useFilter } from "../../../hooks/useFilter";
import { usePagination } from "../../../hooks/usePagination";
import { usePDFExport } from "../../../hooks/usePDFExport";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Users = () => {
  const axiosSecure = useAxiosSecure();
  const { refetch, data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users`);
      return res.data;
    },
  });

  const handleMakeAdmin = (user) => {
    axiosSecure.patch(`/users/admin/${user._id}`).then((res) => {
      alert(`${user.name} is now admin`);
      refetch();
    });
  };

  const handleDeleteUser = (user) => {
    axiosSecure.delete(`/users/${user._id}`).then((res) => {
      alert(`${user.name} is removed from database`);
      refetch();
    });
  };

  // Custom Hooks
  const {
    search,
    setSearch,
    filteredData: searchResults,
  } = useSearch(users, "name");
  const {
    filterValue,
    setFilterValue,
    filteredData: filteredUsers,
  } = useFilter(searchResults, "role");
  const { currentPage, setCurrentPage, totalPages, paginatedData } =
    usePagination(filteredUsers, 5);
  const { exportToPDF } = usePDFExport(
    users,
    ["name", "email", "role"],
    "Users List"
  );

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
  }, [paginatedData]);

  return (
    <div ref={containerRef}>
      <div className="flex flex-col md:flex-row items-center justify-between mx-4 my-4 gap-4">
        <h5 className="text-lg font-bold">All Users</h5>
        <div className="flex flex-col md:flex-row items-center gap-3 w-full md:w-auto">
          <button
            onClick={exportToPDF}
            className="btn normal btn-outline flex items-center gap-2 w-full md:w-auto"
          >
            <FaFilePdf className="text-red-500" />
            Download PDF
          </button>
          <div className="relative w-full md:w-auto">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered pr-10 w-full md:w-auto"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <IoSearchOutline className="absolute top-2/4 right-3 -translate-y-2/4 text-gray-500 text-xl" />
          </div>
          <select
            className="select select-bordered w-full md:w-auto"
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
          >
            <option value="">All Roles</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
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
            {paginatedData.map((user) => (
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
                    <button
                      onClick={() => handleMakeAdmin(user)}
                      className="btn btn-circle btn-sm bg-steelBlue text-white hover:bg-white hover:text-steelBlue hover:border-steelBlue"
                    >
                      <FaUsers />
                    </button>
                  )}
                </td>
                <th>
                  <button
                    onClick={() => handleDeleteUser(user)}
                    className="btn btn-ghost btn-lg text-[#959595]"
                  >
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
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`btn-sm btn-circle ${
              currentPage === index + 1
                ? "btn-active bg-steelBlue text-white"
                : "btn-outline"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Users;
