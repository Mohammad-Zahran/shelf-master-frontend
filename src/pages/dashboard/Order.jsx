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
          <div>
            <div className="overflow-x-auto">
              <table className="table w-full border border-gray-200">
                {/* Table Head */}
                <thead className="bg-green text-white">
                  <tr>
                    <th>#</th>
                    <th>Order Date</th>
                    <th>Number of Items</th>
                    <th>Price ({currency})</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                {/* Table Body */}
                <tbody>
                  {orders.map((item, index) => (
                    <tr key={index} className="border-b">
                      <td>{index + 1}</td>
                      <td>{formatDate(item.createdAt)}</td>
                      <td>{item.quantity || 0}</td>
                      <td>
                        {currency === "LBP" ? "LBP" : "$"}{" "}
                        {convertCurrency(item.price)}
                      </td>
                      <td>{item.status}</td>
                      <td>
                        <Link
                          to="/contact"
                          className="btn btn-xs bg-blue-500 text-white"
                        >
                          <FaEnvelope style={{ verticalAlign: "middle" }} />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <hr />
            {/* Currency Conversion Button */}
            <div className="flex justify-end my-4">
              <button
                className="btn btn-md bg-green text-white px-8 py-1"
                onClick={() => setCurrency(currency === "USD" ? "LBP" : "USD")}
              >
                Convert to {currency === "USD" ? "LBP" : "USD"}
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center mt-20">
            <p>No orders found. Please place an order.</p>
            <Link to="/menu">
              <button className="btn bg-green text-white mt-3">
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
