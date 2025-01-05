import React from "react";
import useProduct from "../../../hooks/useProduct";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "./../../../hooks/useAxiosSecure";
import { FaEllipsisV, FaEdit } from "react-icons/fa";

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
            className="flex bg-white shadow-md rounded-lg overflow-hidden"
          >
            {/* Image */}
            <img
              src={item.images[0]}
              alt={item.name}
              className="h-24 w-24 object-cover"
            />
            {/* Card Body */}
            <div className="flex-1 p-4">
              <div className="flex justify-between">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <button
                  onClick={() => handleMenuClick(item)}
                  className="text-gray-500 hover:text-gray-800"
                >
                  <FaEllipsisV />
                </button>
              </div>
              <p className="text-gray-500 mt-1">${item.price.toFixed(2)}</p>
              <p className="text-gray-400 mt-2 text-sm">
                {item.description.length > 50
                  ? `${item.description.slice(0, 50)}...`
                  : item.description}
              </p>
              <div className="mt-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-500 text-sm">Sales</p>
                    <p className="text-gray-800 font-medium">1269</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Remaining Products</p>
                    <p className="text-gray-800 font-medium">{item.stock}</p>
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
