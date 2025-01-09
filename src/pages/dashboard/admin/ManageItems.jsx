import React, { useEffect, useRef } from "react";
import useProduct from "../../../hooks/useProduct";
import Swal from "sweetalert2";
import useAxiosSecure from "./../../../hooks/useAxiosSecure";
import { FaEllipsisH, FaFilePdf } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import gsap from "gsap";
import { useSearch } from "../../../hooks/useSearch";
import { useFilter } from "../../../hooks/useFilter";
import { usePagination } from "../../../hooks/usePagination";
import { usePDFExport } from "../../../hooks/usePDFExport";

const ManageItems = () => {
  const [product, , refetch] = useProduct();
  const axiosSecure = useAxiosSecure();

  const handleDeleteItem = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/products/${item._id}`);
        if (res) {
          refetch();
          Swal.fire({
            title: "Deleted!",
            text: "Your item has been deleted.",
            icon: "success",
          });
        }
      }
    });
  };

  const handleMenuClick = (item) => {
    Swal.fire({
      title: `Manage ${item.name}`,
      showCancelButton: true,
      confirmButtonText: "Update",
      cancelButtonText: "Delete",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = `/dashboard/update-product/${item._id}`;
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        handleDeleteItem(item);
      }
    });
  };

  // Function to determine the progress bar color
  const getStockColor = (stock) => {
    if (stock > 50) return "bg-green-500";
    if (stock > 20) return "bg-orange-500";
    return "bg-red-500";
  };

  // Custom Hooks for search, filter, and pagination
  const {
    search,
    setSearch,
    filteredData: searchResults,
  } = useSearch(product, "name");
  const {
    filterValue,
    setFilterValue,
    filteredData: filteredItems,
  } = useFilter(searchResults, "category");
  const { currentPage, setCurrentPage, totalPages, paginatedData } =
    usePagination(filteredItems, 6);

  const { exportToPDF } = usePDFExport(
    product,
    ["name", "price", "stock", "category"],
    "Product List"
  );

  // GSAP Animation Refs
  const containerRef = useRef(null);

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

  return (
    <div ref={containerRef} className="w-full md:w-[1250px] px-4 mx-auto">
      <h2 className="text-2xl font-semibold my-4">
        Manage All <span className="text-steelBlue">Items</span>
      </h2>

      {/* Search, Filter, and PDF Export */}
      <div className="flex flex-col md:flex-row items-center justify-between mx-4 my-4 gap-4">
        <button
          onClick={exportToPDF}
          className="btn normal btn-outline flex items-center gap-2"
        >
          <FaFilePdf className="text-red-500" />
          Download PDF
        </button>
        <div className="flex flex-col md:flex-row items-center gap-3 w-full md:w-auto">
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
          <select
            className="select select-bordered w-full md:w-auto"
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="Heavy-Duty">Heavy-Duty</option>
            <option value="Adjustable">Adjustable</option>
            <option value="Modern">Modern</option>
            <option value="Rustic">Rustic</option>
            <option value="Industrial">Industrial</option>
          </select>
        </div>
      </div>

      {/* Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {paginatedData.map((item) => (
          <div
            key={item._id}
            className="flex flex-col bg-[#FAFAFA] rounded-lg p-4"
          >
            {/* Header */}
            <div className="flex items-start">
              {/* Image */}
              <img
                src={item.images[0]}
                alt={item.name}
                className="h-20 w-20 object-cover rounded"
              />
              {/* Text Details */}
              <div className="ml-4 flex-1">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <button
                    onClick={() => handleMenuClick(item)}
                    className="text-gray-500 hover:text-gray-800"
                  >
                    <FaEllipsisH />
                  </button>
                </div>
                <p className="text-gray-500 mt-1">${item.price.toFixed(2)}</p>
              </div>
            </div>

            {/* Summary Section */}
            <div className="mt-4">
              <p className="text-sm font-bold">Summary</p>
              <p className="text-gray-400 text-sm mt-1">
                {item.description.length > 50
                  ? `${item.description.slice(0, 50)}...`
                  : item.description}
              </p>
            </div>

            {/* Footer - Sales and Stock */}
            <div className="mt-4 p-3 bg-[#FAFAFA] rounded-lg border border-gray-300">
              <div className="flex justify-between items-center">
                <p className="text-gray-500 text-sm">Sales</p>
                <p className="text-gray-800 font-medium">1269</p>
              </div>
              <div className="border-b border-gray-300 my-2"></div>
              <div className="flex justify-between items-center">
                <p className="text-gray-500 text-sm">Remaining Products</p>
                <div className="flex items-center gap-2">
                  <p className="text-gray-800 font-medium">{item.stock}</p>
                  <div className="w-24 h-2 rounded-full bg-gray-300">
                    <div
                      className={`h-2 rounded-full ${getStockColor(
                        item.stock
                      )}`}
                      style={{ width: `${(item.stock / 100) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
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

export default ManageItems;
