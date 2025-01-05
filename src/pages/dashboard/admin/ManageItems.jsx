import React from "react";
import useProduct from "../../../hooks/useProduct";
import Swal from "sweetalert2";
import useAxiosSecure from "./../../../hooks/useAxiosSecure";
import { FaEllipsisH } from "react-icons/fa";

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

  return (
    <div className="w-full md:w-[1250px] px-4 mx-auto">
      <h2 className="text-2xl font-semibold my-4">
        Manage All <span className="text-steelBlue">Items</span>
      </h2>
      {/* Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {product.map((item) => (
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
                  {/* 3 Dots Menu */}
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
              {/* Sales */}
              <div className="flex justify-between items-center">
                <p className="text-gray-500 text-sm">Sales</p>
                <p className="text-gray-800 font-medium">1269</p>
              </div>
              {/* Divider Line */}
              <div className="border-b border-gray-300 my-2"></div>
              {/* Remaining Products */}
              <div className="flex justify-between items-center">
                <p className="text-gray-500 text-sm">Remaining Products</p>
                <div className="flex items-center gap-2">
                  <p className="text-gray-800 font-medium">{item.stock}</p>
                  {/* Stock Progress Line */}
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
    </div>
  );
};

export default ManageItems;
