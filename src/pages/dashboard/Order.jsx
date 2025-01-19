import React, { useState, useEffect } from "react";
import useAuth from "./../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { FaEnvelope, FaFilePdf } from "react-icons/fa";
import axios from "axios";
import { useSearch } from "./../../hooks/useSearch";
import { useFilter } from "./../../hooks/useFilter";
import { usePagination } from "./../../hooks/usePagination";
import { usePDFExport } from "./../../hooks/usePDFExport";

const Order = () => {
  const { user } = useAuth();
  const token = localStorage.getItem("access-token");

  const [currency, setCurrency] = useState("USD");
  const [exchangeRate, setExchangeRate] = useState(null);

  useEffect(() => {
    fetchExchangeRate();
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
    queryKey: ["orders", user?.email],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:8080/payments?email=${user?.email}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      return res.json();
    },
  });

  const {
    search,
    setSearch,
    filteredData: searchedOrders,
  } = useSearch(orders, "status");
  const {
    filterValue,
    setFilterValue,
    filteredData: filteredOrders,
  } = useFilter(searchedOrders, "status");
  const { currentPage, setCurrentPage, totalPages, paginatedData } =
    usePagination(filteredOrders, 5);
  const { exportToPDF } = usePDFExport(
    paginatedData,
    ["status", "createdAt", "price"],
    "Orders Export"
  );

  const formatDate = (createdAt) => {
    const createdAtDate = new Date(createdAt);
    return createdAtDate.toLocaleDateString();
  };

  return (
    <div className="max-w-screen-2xl mt-16 container mx-auto xl:px-24 px-4">
      {/* Filters and Actions */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search status..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-2 border border-gray-300 rounded shadow-sm"
          />
          <select
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
            className="p-2 border border-gray-300 rounded shadow-sm"
          >
            <option value="">All</option>
            <option value="New">New</option>
            <option value="Shipped">Shipped</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
        <button onClick={exportToPDF} className="btn normal">
          <FaFilePdf className="text-red-500" />
          Download PDF
        </button>
      </div>
      {/* Table Section */}
      <div>
        {orders.length > 0 ? (
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="table-auto w-full text-left border-collapse">
                {/* Table Head */}
                <thead className="bg-gray-100 text-gray-600 uppercase text-sm font-medium">
                  <tr>
                    <th className="px-6 py-4">#</th>
                    <th className="px-6 py-4">Order Date</th>
                    <th className="px-6 py-4">Number of Items</th>
                    <th className="px-6 py-4">Price ({currency})</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Action</th>
                  </tr>
                </thead>
                {/* Table Body */}
                <tbody className="text-gray-700 text-sm">
                  {paginatedData.map((item, index) => (
                    <tr
                      key={index}
                      className={`${
                        index % 2 === 0 ? "bg-gray-50" : "bg-white"
                      } hover:bg-gray-100`}
                    >
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {index + 1 + (currentPage - 1) * 5}
                      </td>
                      <td className="px-6 py-4">
                        {formatDate(item.createdAt)}
                      </td>
                      <td className="px-6 py-4">{item.quantity || 0}</td>
                      <td className="px-6 py-4">
                        {currency === "LBP" ? "LBP" : "$"}{" "}
                        {convertCurrency(item.price)}
                      </td>
                      <td className="px-6 py-4 capitalize">{item.status}</td>
                      <td className="px-6 py-4">
                        <Link
                          to="/contact"
                          className="inline-flex items-center justify-center w-8 h-8 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600"
                        >
                          <FaEnvelope />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Pagination */}
            <div className="flex justify-between items-center py-4 px-6 bg-gray-100">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className="bg-steelBlue text-white px-4 py-2 rounded shadow-md hover:bg-white hover:text-steelBlue"
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                className="bg-steelBlue text-white px-4 py-2 rounded shadow-md hover:bg-white hover:text-steelBlue"
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center mt-20">
            <p className="text-gray-500">
              No orders found. Please place an order.
            </p>
            <Link to="/menu">
              <button className="btn bg-green-500 text-white mt-3 font-bold py-2 px-4 rounded shadow-md hover:bg-green-600">
                Back to Menu
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Order;
