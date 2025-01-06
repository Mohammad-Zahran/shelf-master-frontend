import React, { useState, useEffect } from "react";
import useAuth from "./../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { FaEnvelope } from "react-icons/fa";
import axios from "axios";

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

  const formatDate = (createdAt) => {
    const createdAtDate = new Date(createdAt);
    return createdAtDate.toLocaleDateString();
  };

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
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
                  {orders.map((item, index) => (
                    <tr
                      key={index}
                      className={`${
                        index % 2 === 0 ? "bg-gray-50" : "bg-white"
                      } hover:bg-gray-100`}
                    >
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {index + 1}
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
            {/* Currency Conversion Button */}
            <div className="flex justify-end py-4 px-6 bg-gray-100">
              <button
                className="btn normal"
                onClick={() => setCurrency(currency === "USD" ? "LBP" : "USD")}
              >
                Convert to {currency === "USD" ? "LBP" : "USD"}
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
