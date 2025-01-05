import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React from "react";

const CheckoutForm = ({ price, cart }) => {
  const stripe = useStripe();
  const elements = useElements();
  
  const handleSubmit = async (event) => {};
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
        {/* Stripe form */}
        <form onSubmit={handleSubmit}>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
          <button type="submit" disabled={!stripe}>
            Pay
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutForm;
