import React from "react";
import useCart from "./../../hooks/useCart";

const CartPage = () => {
  const [cart, refetch] = useCart();
  return (
    <div className="section-container ">
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
                          <img
                            src={item.images[0]}
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    {item.name}
                    <br />
                    <span className="badge badge-ghost badge-sm">
                      {item.material}
                    </span>
                  </td>
                  <td>{item.quantity}</td>
                  <td>{item.price}</td>
                  <th>
                    <button className="btn btn-ghost btn-xs">details</button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
