import React, { useContext } from "react";
import useCart from "./../../hooks/useCart";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { AuthContext } from "../../contexts/AuthProvider";

const CartPage = () => {
  const [cart, refetch] = useCart();
  const { user } = useContext(AuthContext);


  const handleIncrease = (item) => {
    console.log(item._id);
  }

  // handleDecrease function
  const handleDecrease = (item) => {
    console.log(item._id);
  };

  // handledelete btn
  const handleDelete = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:8080/carts/${item._id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
            } else {
              Swal.fire({
                title: "Error!",
                text: data.message || "Failed to delete the item.",
                icon: "error",
              });
            }
          })
          .catch((err) => {
            Swal.fire({
              title: "Error!",
              text: "Something went wrong.",
              icon: "error",
            });
          });
      }
    });
  };

  return (
    <div className="section-container ">
      {/* table for the cart  */}
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead className="bg-steelBlue text-white rounded-sm">
              <tr>
                <th>#</th>
                <th>Shelf</th>
                <th>Item Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {cart.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img src={item.images[0]} alt="" />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="font-medium">
                    {item.name}
                    <br />
                    <span className="badge badge-ghost badge-sm">
                      {item.material}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn normal btn-xs"
                      onClick={() => handleDecrease(item)}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={() => console.log(item.quantity)}
                      className="w-10 mx-2 text-center overflow-hidden appearance-none"
                    />
                    <button className="btn normal btn-xs" onClick={() => handleIncrease(item)}>+</button>
                  </td>
                  <td>{item.price}</td>
                  <th>
                    <button
                      className="btn btn-ghost text-red-600 btn-xs"
                      onClick={() => handleDelete(item)}
                    >
                      <FaTrash />
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* customer details */}
      <div className="my-12 flex flex-col md:flex-row justify-between items-start space-y-6 md:space-y-0 md:space-x-6">
        {/* Customer Details Section */}
        <div className="md:w-1/2 space-y-3">
          <h3 className="font-medium text-lg">Customer Details</h3>
          <p>Name: {user.displayName}</p>
          <p>Email: {user.email}</p>
          <p>User ID: {user.uid}</p>
        </div>

        {/* Shopping Details Section */}
        <div className="md:w-1/2 space-y-3">
          <h3 className="font-medium text-lg">Shopping Details</h3>
          <p>Total Items: {cart.length}</p>
          <p>Total Price: $0.00</p>
          <button className="btn normal">Proceed to Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
