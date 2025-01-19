import React, { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { IoSearchOutline } from "react-icons/io5";
import { FaFilePdf, FaTrashAlt } from "react-icons/fa";
import { useSearch } from "../../../hooks/useSearch";
import { usePagination } from "../../../hooks/usePagination";
import gsap from "gsap";
import { usePDFExport } from "../../../hooks/usePDFExport";

const ManageModel = () => {
  const [models, setModels] = useState([]);
  const axiosSecure = useAxiosSecure();
  const containerRef = useRef(null);
  const tableRef = useRef(null);

  // PDF Export Hook
  const { exportToPDF } = usePDFExport(
    models,
    ["name", "photo", "model3D"],
    "3D Models"
  );

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await axiosSecure.get("/3d");
        setModels(response.data.data);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to fetch models. Please try again.",
        });
      }
    };

    fetchModels();
  }, [axiosSecure]);

  // Search and Pagination Hooks
  const {
    search,
    setSearch,
    filteredData: searchResults,
  } = useSearch(models, "name");
  const { currentPage, setCurrentPage, totalPages, paginatedData } =
    usePagination(searchResults, 6);

  // GSAP Animation
  useEffect(() => {
    const rows = tableRef.current.querySelectorAll("tbody tr");
    gsap.set(containerRef.current, { opacity: 0, scale: 0.9 });
    gsap.set(rows, { opacity: 0, x: -50 });

    setTimeout(() => {
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
    }, 100);
  }, [paginatedData]);

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/3d/${id}`);
          setModels((prevModels) =>
            prevModels.filter((model) => model._id !== id)
          );
          Swal.fire("Deleted!", "The model has been deleted.", "success");
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to delete the model. Please try again.",
          });
        }
      }
    });
  };

  const handleUpdate = (id) => {
    window.location.href = `/dashboard/update-model/${id}`;
  };

  return (
    <div ref={containerRef}>
      <div className="flex flex-col md:flex-row items-center justify-between mx-4 my-4 gap-4">
        <h2 className="text-2xl font-semibold my-4">
          Manage <span className="text-steelBlue">3D Models</span>
        </h2>
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
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra" ref={tableRef}>
          <thead>
            <tr>
              <th>Photo</th>
              <th>Name</th>
              <th>Model3D</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((model) => (
              <tr key={model._id}>
                <td>
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        alt={model.name}
                        src={model.photo || "https://via.placeholder.com/150"}
                      />
                    </div>
                  </div>
                </td>
                <td>{model.name}</td>
                <td>
                  <a
                    href={model.model3D}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    View Model
                  </a>
                </td>
                <td>
                  <button
                    onClick={() => handleUpdate(model._id)}
                    className="btn btn-sm bg-steelBlue text-white hover:bg-white hover:text-steelBlue"
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(model._id)}
                    className="btn btn-ghost btn-sm text-red-500 hover:text-red-600"
                  >
                    <FaTrashAlt />
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

export default ManageModel;
