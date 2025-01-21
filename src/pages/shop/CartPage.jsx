import React, { useContext, useEffect, useState } from "react";
import useCart from "./../../hooks/useCart";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { AuthContext } from "../../contexts/AuthProvider";
import { Link } from "react-router-dom";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const CartPage = () => {
  const [cart, refetch] = useCart();
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic(); // Use centralized Axios instance
  const [exchangeRate, setExchangeRate] = useState(null); // State to store exchange rate
  const [currency, setCurrency] = useState("USD"); // Default currency

  useEffect(() => {
    fetchExchangeRate();
  }, []);

  const fetchExchangeRate = async () => {
    try {
      const response = await axiosPublic.get(
        "https://api.exchangerate-api.com/v4/latest/USD"
      );
      setExchangeRate(response.data.rates.LBP); // Assuming LBP is the desired currency
    } catch (error) {
      console.error("Error fetching exchange rate:", error);
    }
  };

  const calculateTotalPrice = (item) => {
    const price = parseFloat(item.price) || 0; // Ensure price is a valid number
    const quantity = parseInt(item.quantity, 10) || 0; // Ensure quantity is a valid number
    const total = price * quantity;

    if (currency === "LBP" && exchangeRate) {
      return (total * exchangeRate).toLocaleString("en-US", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      });
    }

    return total.toFixed(2);
  };

  const cartSubtotal = cart.reduce((total, item) => {
    const itemTotal = parseFloat(calculateTotalPrice(item).replace(/,/g, "")) || 0;
    return total + itemTotal;
  }, 0);

  const formattedCartSubtotal =
    currency === "LBP"
      ? cartSubtotal.toLocaleString("en-US", {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        })
      : cartSubtotal.toFixed(2);

  const handleIncrease = async (item) => {
    try {
      const response = await axiosPublic.put(`/carts/${item._id}`, {
        productId: item.productId,
        name: item.name,
        images: item.images,
        material: item.material,
        price: item.price,
        quantity: item.quantity + 1,
        email: user.email,
      });

      if (response.status === 200) {
        refetch();
      } else {
        console.error("Failed to update quantity");
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const handleDecrease = async (item) => {
    if (item.quantity > 1) {
      try {
        const response = await axiosPublic.put(`/carts/${item._id}`, {
          productId: item.productId,
          name: item.name,
          images: item.images,
          material: item.material,
          price: item.price,
          quantity: item.quantity - 1,
          email: user.email,
        });

        if (response.status === 200) {
          refetch();
        } else {
          console.error("Failed to decrease quantity");
        }
      } catch (error) {
        console.error("Error decreasing quantity:", error);
      }
    } else {
      console.warn("Quantity cannot be less than 1");
    }
  };

  const handleDelete = (item) => {
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
        try {
          const response = await axiosPublic.delete(`/carts/${item._id}`);
          if (response.data.success) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your item has been deleted.",
              icon: "success",
            });
          } else {
            Swal.fire({
              title: "Error!",
              text: response.data.message || "Failed to delete the item.",
              icon: "error",
            });
          }
        } catch (error) {
          Swal.fire({
            title: "Error!",
            text: "Something went wrong.",
            icon: "error",
          });
        }
      }
    });
  };

  return (
    <div className="section-container mx-auto p-4 sm:p-6">
      <h1 className="text-3xl font-bold ml-2 sm:ml-5 mb-6 text-charcoal">
        Cart
      </h1>
      <div className="flex flex-wrap md:flex-nowrap gap-6">
        {/* Cart Items Section */}
        <div className="flex-1 bg-white rounded-md p-4 sm:p-6">
          <h2 className="text-xl font-semibold mb-4 text-charcoal">
            Your Items
          </h2>
          <div className="space-y-6">
            {cart.map((item, index) => (
              <div
                key={index}
                className="relative flex flex-wrap sm:flex-nowrap gap-6 pb-6 border-b border-gray-300"
              >
                <img
                  src={item.images[0]}
                  alt={item.name}
                  className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-lg">{item.name}</h3>
                  <p className="text-gray-500 mb-4">
                    Material: {item.material}
                  </p>
                  <div className="flex items-center">
                    <div className="flex items-center border rounded p-1">
                      <button
                        className="px-3 py-1 border-r"
                        onClick={() => handleDecrease(item)}
                      >
                        -
                      </button>
                      <span className="px-4">{item.quantity}</span>
                      <button
                        className="px-3 py-1 border-l"
                        onClick={() => handleIncrease(item)}
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="ml-4 text-red-600"
                      onClick={() => handleDelete(item)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <div className="absolute sm:static top-0 right-0 sm:right-auto">
                  <p className="text-lg font-medium">
                    {currency === "USD" ? "$" : "LBP"}
                    {calculateTotalPrice(item)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary Section */}
        <div className="w-full sm:w-1/2 md:w-1/4 bg-white border border-gray-300 rounded-md p-4 sm:p-6">
          <h2 className="text-xl font-medium mb-4">Order Summary</h2>
          <div className="space-y-3">
            <p className="flex justify-between">
              <span>Subtotal:</span>
              <span className="font-medium">
                {currency === "USD" ? "$" : "LBP"}
                {formattedCartSubtotal}
              </span>
            </p>
            <p className="flex justify-between">
              <span>Estimated Tax:</span>
              <span className="font-medium">
                {currency === "USD" ? "$" : "LBP"}0.00
              </span>
            </p>
            <p className="flex justify-between font-semibold text-lg border-t pt-3">
              <span>Total:</span>
              <span>
                {currency === "USD" ? "$" : "LBP"}
                {formattedCartSubtotal}
              </span>
            </p>
          </div>
          <button
            className="w-full bg-green-500 text-white py-2 rounded-md mt-6 flex items-center justify-center gap-2"
            onClick={() => setCurrency(currency === "USD" ? "LBP" : "USD")}
          >
            <FaMoneyBillTransfer />
            Convert to {currency === "USD" ? "LBP" : "USD"}
          </button>
          <Link to="/process-checkout">
            <button className="w-full btn normal text-white py-2 mt-4 rounded-md">
              Proceed to Checkout
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
