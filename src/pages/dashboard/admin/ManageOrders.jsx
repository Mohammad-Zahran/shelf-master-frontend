import React, { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaTrashAlt, FaFilePdf } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { GiConfirmed } from "react-icons/gi";
import Swal from "sweetalert2";
import axios from "axios";
import gsap from "gsap";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useSearch } from "../../../hooks/useSearch";
import { useFilter } from "../../../hooks/useFilter";
import { usePagination } from "../../../hooks/usePagination";
import { usePDFExport } from "../../../hooks/usePDFExport";

const ManageOrders = () => {
  const axiosSecure = useAxiosSecure();
  const [currency, setCurrency] = useState("USD");
  const [exchangeRate, setExchangeRate] = useState(null);

  const containerRef = useRef(null);
  const tableRef = useRef(null);

  useEffect(() => {
    fetchExchangeRate();

    // GSAP Animations
    const rows = tableRef.current?.querySelectorAll("tbody tr");
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
  }, []);

  const fetchExchangeRate = async () => {
    try {
      const response = await axios.get(
        "https://api.exchangerate-api.com/v4/latest/USD"
      );
      setExchangeRate(response.data.rates.LBP);
    } catch (error) {
      console.error("Error fetching exchange rate:", error);
    }
  };

  const convertCurrency = (price) => {
    if (currency === "LBP" && exchangeRate) {
      return (price * exchangeRate).toFixed(2);
    }
    return price.toFixed(2);
  };

  const { refetch, data: orders = [] } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/payments/all");
      return res.data;
    },
  });

  const handleConfirm = async (item) => {
    await axiosSecure.patch(`/payments/${item._id}`).then(() => {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Payment confirmed!",
        showConfirmButton: false,
        timer: 1500,
      });
      refetch();
    });
  };

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
        const res = await axiosSecure.delete(`/payments/${item._id}`);
        if (res) {
          refetch();
          Swal.fire({
            title: "Deleted!",
            text: "The order has been deleted.",
            icon: "success",
          });
        }
      }
    });
  };

  const {
    search,
    setSearch,
    filteredData: searchResults,
  } = useSearch(orders, "email");
  const {
    filterValue,
    setFilterValue,
    filteredData: filteredOrders,
  } = useFilter(searchResults, "status");
  const { currentPage, setCurrentPage, totalPages, paginatedData } =
    usePagination(filteredOrders, 5);
  const { exportToPDF } = usePDFExport(
    orders,
    ["email", "transitionId", "price", "status"],
    "Orders List"
  );

  return (
    <div ref={containerRef}>
      <div className="flex flex-col md:flex-row items-center justify-between mx-4 my-4 gap-4">
        <h5 className="text-lg font-bold">Manage Orders</h5>
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
              placeholder="Search by email"
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
            <option value="">All Status</option>
            <option value="confirmed">Confirmed</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra" ref={tableRef}>
          <thead>
            <tr>
              <th>#</th>
              <th>Email</th>
              <th>Transaction ID</th>
              <th>Price ({currency})</th>
              <th>Status</th>
              <th>Confirm</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1 + (currentPage - 1) * 5}</td>
                <td>{item.email}</td>
                <td>{item.transitionId}</td>
                <td>
                  {currency === "LBP" ? "LBP" : "$"}{" "}
                  {convertCurrency(item.price)}
                </td>
                <td>{item.status}</td>
                <td>
                  {item.status === "confirmed" ? (
                    "Done"
                  ) : (
                    <button
                      onClick={() => handleConfirm(item)}
                      className="btn btn-xs bg-steelBlue hover:bg-white text-white hover:text-steelBlue"
                    >
                      <GiConfirmed />
                    </button>
                  )}
                </td>
                <td>
                  <button
                    onClick={() => handleDeleteItem(item)}
                    className="btn btn-xs bg-steelBlue hover:bg-white text-white hover:text-steelBlue"
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
                ? "btn-active bg-steelBlue text-white"
                : "btn-outline"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      <div className="flex justify-end my-4">
        <button
          className="btn normal"
          onClick={() => setCurrency(currency === "USD" ? "LBP" : "USD")}
        >
          Convert to {currency === "USD" ? "LBP" : "USD"}
        </button>
      </div>
    </div>
  );
};

export default ManageOrders;
