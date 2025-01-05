import React from "react";

const CheckoutForm = ({ price, cart }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-start items-start gap-8">
      {/* left side */}
      <div className="md:w-1/2 w-full space-y-3">
        <h4 className="text-lg font-semibold">Order Summary</h4>
        <p>Total Price: ${price}</p>
        <p>Number of Items: {cart.length}</p>
      </div>
      {/* right side */}
      <div className="md:w-1/3 space-y-3 card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl px-4 py-7">
        <h4 className="text-lg font-semibold">Process your Payment!</h4>
        <h5 className="font-medium">Credit/Debit Card</h5>
      </div>
    </div>
  );
};

export default CheckoutForm;
