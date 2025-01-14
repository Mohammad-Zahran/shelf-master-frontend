import React, { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { IoSearchOutline } from "react-icons/io5";
import { useSearch } from "../../../hooks/useSearch";
import { usePagination } from "../../../hooks/usePagination";
import gsap from "gsap";
import { usePDFExport } from "../../../hooks/usePDFExport";
import { FaFilePdf } from "react-icons/fa";

const ManageModel = () => {
  const [models, setModels] = useState([]);
  const axiosSecure = useAxiosSecure();
  const containerRef = useRef(null);

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
    gsap.set(containerRef.current, { opacity: 0, scale: 0.9 });

    setTimeout(() => {
      gsap.to(containerRef.current, {
        opacity: 1,
        scale: 1,
        duration: 1,
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
    <div ref={containerRef} className="w-full md:w-[1250px] px-4 mx-auto">
      <h2 className="text-2xl font-semibold my-4">
        Manage <span className="text-steelBlue">3D Models</span>
      </h2>

      {/* Control Panel */}
      <div className="flex flex-col md:flex-row items-center justify-between mx-4 my-4 gap-4">
        <button
          onClick={exportToPDF}
          className="btn normal btn-outline flex items-center gap-2"
        >
          <FaFilePdf className="text-red-500" />
          Download PDF
        </button>
        <div className="relative w-full md:w-auto">
          <input
            type="text"
            placeholder="Search by Name"
            className="input input-bordered pr-10 w-full md:w-auto"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <IoSearchOutline className="absolute top-2/4 right-3 -translate-y-2/4 text-gray-500 text-xl" />
        </div>
      </div>

      {/* Models Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {paginatedData.map((model) => (
          <div
            key={model._id}
            className="flex flex-col bg-[#FAFAFA] rounded-lg p-4"
          >
            {/* Header */}
            <div className="flex items-start">
              <img
                src={model.photo}
                alt={model.name}
                className="h-20 w-20 object-cover rounded"
              />
              <div className="ml-4 flex-1">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold">{model.name}</h3>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-4 flex justify-between">
              <button
                onClick={() => handleUpdate(model._id)}
                className="bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(model._id)}
                className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
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
