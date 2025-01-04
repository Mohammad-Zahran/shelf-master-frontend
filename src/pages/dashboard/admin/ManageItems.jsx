import React from "react";
import useProduct from "../../../hooks/useProduct";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";

const ManageItems = () => {
  const [product, refetch] = useProduct();
  console.log(product);
  return (
    <div className="w-full md:w-[1250px] px-4 mx-auto">
      <h2 className="text-2xl font-semibold my-4">
        Manage All <span className="text-steelBlue">Items</span>
      </h2>
      {/* shelf item table */}
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Item Name</th>
                <th>Price</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {product.map((item, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img src={item.images[0]} alt="" />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{item.name}</td>
                  <td>${item.price}</td>
                  <td>
                    <Link to={`/dashboard/update-menu/${item._id}`}>
                      <button className="btn btn-ghost btn-xs bg-steelBlue text-white hover:text-steelBlue hover:bg-white"><FaEdit />Update</button>
                    </Link>
                  </td>
                  <td>
                    <button onClick={() => handleDeleteItem(item)} className="btn btn-ghost btn-xs">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageItems;
