import React, { useState, useEffect } from "react";
import useAuth from "./../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { FaEnvelope } from "react-icons/fa";
import axios from "axios";

const Order = () => {
  const { user } = useAuth();
  console.log(user.email);
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
      setExchangeRate(response.data.rates.LBP); // Assuming LBP is the desired currency
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
      {/* banner */}
      <div className="bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100%">
        <div className="py-28 flex flex-col items-center justify-center">
          {/* content */}
          <div className="text-center px-4 space-y-7">
            <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
              Track All Your<span className="text-green"> Orders</span>
            </h2>
          </div>
        </div>
      </div>

      {/* table */}
      <div>
        {orders.length > 0 ? (
          <div>
            <div className="">
              <div className="overflow-x-auto">
                <table className="table">
                  {/* head */}
                  <thead className="bg-green text-white rounded-sm">
                    <tr>
                      <th>#</th>
                      <th>Order Date</th>
                      <th>TransitionId</th>
                      <th>Price ({currency})</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{formatDate(item.createdAt)}</td>
                        <td className="font-medium">{item.transitionId}</td>
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
                  {/* foot */}
                </table>
              </div>
            </div>
            <hr />
            <div className="flex justify-end my-4">
              <button
                className="btn btn-md bg-green text-white px-8 py-1 mt-5"
                onClick={() => setCurrency(currency === "USD" ? "LBP" : "USD")}
              >
                Convert to {currency === "USD" ? "LBP" : "USD"}
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center mt-20">
            <p>Cart is empty. Please add products.</p>
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
