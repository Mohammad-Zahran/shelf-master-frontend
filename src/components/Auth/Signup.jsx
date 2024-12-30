import React from "react";

const Signup = () => {
  return (
    <div className="flex h-screen bg-white">
      {/* Left Section: Signup Form */}
      <div className="w-1/2 flex flex-col justify-center items-center px-10">
        <h2 className="text-3xl font-bold text-black mb-4">Get Started Now</h2>
        <p className="text-gray-500 mb-6">
          Enter your credentials to access your account
        </p>
        <form className="w-full max-w-md space-y-4">
          <input
            type="text"
            placeholder="Name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex items-center gap-2">
            <input type="checkbox" id="terms" />
            <label htmlFor="terms" className="text-sm text-gray-500">
              I agree to the terms & policy
            </label>
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          >
            Sign Up
          </button>
        </form>
        <div className="flex items-center mt-4 space-x-4">
          <button className="flex items-center justify-center w-full py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition">
            Sign in with Google
          </button>
          <button className="flex items-center justify-center w-full py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition">
            Sign in with Apple
          </button>
        </div>
        <p className="mt-4 text-sm text-gray-500">
          Have an Account?{" "}
          <a href="#" className="text-blue-500 hover:underline">
            Sign In
          </a>
        </p>
      </div>

      {/* Right Section: Image */}
      <div className="w-1/2 h-full overflow-auto flex justify-end">
        <img
          src="/assets/images/signup.png"
          alt="Signup"
          className="h-auto w-auto"
          style={{ maxHeight: "100vh", display:"block" }}
        />
      </div>
    </div>
  );
};

export default Signup;
