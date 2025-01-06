import React, { useState, useEffect } from 'react';
import useAuth from './../../../hooks/useAuth';
import useAxiosSecure from './../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaTrashAlt } from 'react-icons/fa';
import { GiConfirmed } from "react-icons/gi";
import Swal from 'sweetalert2';
import axios from 'axios';

const ManageOrders = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [currency, setCurrency] = useState('USD');
  const [exchangeRate, setExchangeRate] = useState(null);

  useEffect(() => {
    fetchExchangeRate();
  }, []);

  const fetchExchangeRate = async () => {
    try {
      const response = await axios.get('https://api.exchangerate-api.com/v4/latest/USD');
      setExchangeRate(response.data.rates.LBP);
    } catch (error) {
      console.error("Error fetching exchange rate:", error);
    }
  };

  const convertCurrency = (price) => {
    if (currency === 'LBP' && exchangeRate) {
      return (price * exchangeRate).toFixed(2);
    }
    return price.toFixed(2);
  };

  const { refetch, data: orders = [] } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await axiosSecure.get('/payments/all');
      return res.data;
    },
  });

  const handleConfirm = async (item) => {
    console.log(item);
    await axiosSecure.patch(`/payments/${item._id}`)
      .then(res => {
        console.log(res.data);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Payment confirmed!",
          showConfirmButton: false,
          timer: 1500
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

  return (
    <div>
      {/* Title and total users */}
      <div className='flex items-center justify-between m-4'>
        <h5>All Orders</h5>
        <h5>Total Orders: {orders.length}</h5>
      </div>

      {/* Table */}
      <div>
        <div className="overflow-x-auto">
          <table className="table table-zebra md:w-[870px]">
            {/* Table head */}
            <thead className='bg-green text-white rounded-lg'>
              <tr>
                <th>#</th>
                <th>User</th>
                <th>Transition Id</th>
                <th>Price ({currency})</th>
                <th>Status</th>
                <th>Confirm Order</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((item, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{item.email}</td>
                  <td>{item.transitionId}</td>
                  <td>{currency === 'LBP' ? 'LBP' : '$'} {convertCurrency(item.price)}</td>
                  <td>{item.status}</td>
                  <td className='text-center'>
                    {item.status === "confirmed" ? (
                      "done"
                    ) : (
                      <button onClick={() => handleConfirm(item)} className='btn btn-xs bg-green text-white'>
                        <GiConfirmed />
                      </button>
                    )}
                  </td>
                  <td>
                    <button onClick={() => handleDeleteItem(item)} className='btn btn-xs bg-orange-500 text-white'>
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end my-4">
          <button className="btn btn-md bg-green text-white px-8 py-1 mt-5" onClick={() => setCurrency(currency === 'USD' ? 'LBP' : 'USD')}>
            Convert to {currency === 'USD' ? 'LBP' : 'USD'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageOrders;
