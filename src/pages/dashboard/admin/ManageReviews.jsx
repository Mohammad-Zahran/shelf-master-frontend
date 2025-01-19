import React, { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaRegTrashAlt, FaFilePdf } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import gsap from "gsap";
import { useSearch } from "../../../hooks/useSearch";
import { usePagination } from "../../../hooks/usePagination";
import { usePDFExport } from "../../../hooks/usePDFExport";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageReviews = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch all testimonials
  const { refetch, data: reviews = [] } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/testimonials/all`);
      return res.data;
    },
  });

  // Delete a testimonial
  const handleDeleteReview = (review) => {
    axiosSecure
      .delete(`/testimonials/${review._id}`)
      .then((res) => {
        alert(`Review by ${review.name} deleted successfully`);
        refetch();
      })
      .catch((error) => console.error("Error deleting review:", error));
  };

  // Custom Hooks
  const {
    search,
    setSearch,
    filteredData: searchResults,
  } = useSearch(reviews, "name");
  const { currentPage, setCurrentPage, totalPages, paginatedData } =
    usePagination(searchResults, 5);
  const { exportToPDF } = usePDFExport(
    reviews,
    ["name", "rating", "comment"],
    "Reviews List"
  );

  // GSAP Animation
  const containerRef = useRef(null);
  const tableRef = useRef(null);

  useEffect(() => {
    const rows = tableRef.current.querySelectorAll("tbody tr");
    gsap.set(containerRef.current, { opacity: 0, scale: 0.9 });
    gsap.set(rows, { opacity: 0, x: -50 });

    gsap.to(containerRef.current, {
      opacity: 1,
      scale: 1,
      duration: 1,
      ease: "power3.out",
    });

    gsap.to(rows, {
      opacity: 1,
      x: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "power3.out",
    });
  }, [paginatedData]);

  return (
    <div ref={containerRef}>
      <div className="flex flex-col md:flex-row items-center justify-between mx-4 my-4 gap-4">
        <h2 className="text-2xl font-semibold my-4">
          Manage <span className="text-steelBlue">Reviews</span>
        </h2>
        <div className="flex flex-col md:flex-row items-center gap-3 w-full md:w-auto">
          {/* Export to PDF */}
          <button
            onClick={exportToPDF}
            className="btn normal btn-outline flex items-center gap-2 w-full md:w-auto"
          >
            <FaFilePdf className="text-red-500" />
            Download PDF
          </button>

          {/* Search */}
          <div className="relative w-full md:w-auto">
            <input
              type="text"
              placeholder="Search by name"
              className="input input-bordered pr-10 w-full md:w-auto"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <IoSearchOutline className="absolute top-2/4 right-3 -translate-y-2/4 text-gray-500 text-xl" />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra" ref={tableRef}>
          <thead>
            <tr>
              <th>#</th>
              <th>Avatar</th>
              <th>Name</th>
              <th>Rating</th>
              <th>Comment</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((review, index) => (
              <tr key={review._id}>
                <td>{index + 1 + (currentPage - 1) * 5}</td>
                <td>
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        alt="User Avatar"
                        src={
                          review.photoURL ||
                          "https://via.placeholder.com/150" // Default image if photoURL is missing
                        }
                      />
                    </div>
                  </div>
                </td>
                <td>{review.name}</td>
                <td>{review.rating}</td>
                <td>{review.comment}</td>
                <td>
                  <button
                    onClick={() => handleDeleteReview(review)}
                    className="btn btn-ghost btn-sm text-red-500"
                  >
                    <FaRegTrashAlt />
                  </button>
                </td>
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
                ? "btn-active bg-steelBlue text-white hover:bg-white hover:text-steelBlue"
                : "btn-outline bg-text-white text-steelBlue hover:bg-white hover:text-steelBlue"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ManageReviews;
