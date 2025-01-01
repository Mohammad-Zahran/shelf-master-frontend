import React, { useContext, useEffect, useState, useRef } from "react";
import useCart from "./../../hooks/useCart";
import Swal from "sweetalert2";
import { AuthContext } from "../../contexts/AuthProvider";
import { Link } from "react-router-dom";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { gsap } from "gsap";

const CartPage = () => {
  const [cart, refetch] = useCart();
  const { user } = useContext(AuthContext);
  const [exchangeRate, setExchangeRate] = useState(null);
  const [currency, setCurrency] = useState("USD");

  const containerRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    fetchExchangeRate();

    // GSAP Animation for the container
    gsap.from(containerRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power3.out",
    });

    // Staggered animation for cart items
    gsap.from(itemsRef.current, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: "power2.out",
      stagger: 0.2,
    });
  }, []);

  const fetchExchangeRate = async () => {
    try {
      const response = await fetch(
        "https://api.exchangerate-api.com/v4/latest/USD"
      );
      const data = await response.json();
      setExchangeRate(data.rates.LBP);
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

  const handleIncrease = async (item) => {
    try {
      const response = await fetch(`http://localhost:8080/carts/${item._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...item, quantity: item.quantity + 1 }),
      });
      if (response.ok) refetch();
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const handleDecrease = async (item) => {
    if (item.quantity > 1) {
      try {
        const response = await fetch(`http://localhost:8080/carts/${item._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...item, quantity: item.quantity - 1 }),
        });
        if (response.ok) refetch();
      } catch (error) {
        console.error("Error decreasing quantity:", error);
      }
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
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:8080/carts/${item._id}`, {
          method: "DELETE",
        }).then(() => refetch());
      }
    });
  };

  const cartSubtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div ref={containerRef} className="section-container mx-auto p-4 sm:p-6">
      <h1 className="text-3xl font-bold ml-2 sm:ml-5 mb-6 text-charcoal">Cart</h1>
      <div className="flex flex-wrap md:flex-nowrap gap-6">
        {/* Cart Items Section */}
        <div className="flex-1 bg-white rounded-md p-4 sm:p-6">
          <h2 className="text-xl font-semibold mb-4 text-charcoal">Your Items</h2>
          <div className="space-y-6">
            {cart.map((item, index) => (
              <div
                key={index}
                ref={(el) => (itemsRef.current[index] = el)}
                className="relative flex flex-wrap sm:flex-nowrap gap-6 pb-6 border-b border-gray-300"
              >
                <img
                  src={item.images[0]}
                  alt={item.name}
                  className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-lg">{item.name}</h3>
                  <p className="text-gray-500 mb-4">Material: {item.material}</p>
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
                    ${convertCurrency(item.price * item.quantity)}
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
              <span className="font-medium">${cartSubtotal.toFixed(2)}</span>
            </p>
            <p className="flex justify-between">
              <span>Estimated Tax:</span>
              <span className="font-medium">$0.00</span>
            </p>
            <p className="flex justify-between font-semibold text-lg border-t pt-3">
              <span>Total:</span>
              <span>${cartSubtotal.toFixed(2)}</span>
            </p>
          </div>
          <button
            className="w-full bg-green-500 text-white py-2 rounded-md mt-6 flex items-center justify-center gap-2 hover:scale-105 transition-transform"
            onClick={() => setCurrency(currency === "USD" ? "LBP" : "USD")}
          >
            <FaMoneyBillTransfer />
            Convert to {currency === "USD" ? "LBP" : "USD"}
          </button>
          <Link to="/process-checkout">
            <button className="w-full bg-blue-500 text-white py-2 mt-4 rounded-md hover:scale-105 transition-transform">
              Proceed to Checkout
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
