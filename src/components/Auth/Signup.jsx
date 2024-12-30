import React from "react";

const Signup = () => {
  return (
    <div className="flex h-screen bg-white">
      {/* Left Section: Signup Form */}
      <div className="w-1/2 flex flex-col justify-center items-center px-10">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-charcoal mb-4">
            Get Started Now
          </h2>
          <p className="text-steelBlue mb-6">
            Enter your credentials to access your account
          </p>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-steelBlue"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-steelBlue"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-steelBlue"
            />
            <div className="flex items-center gap-2">
              <input type="checkbox" id="terms" />
              <label htmlFor="terms" className="text-sm text-black">
                I agree to the terms & policy
              </label>
            </div>
            <button type="submit" className="btn w-full normal">
              Sign Up
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-grow h-px bg-gray-300"></div>
            <span className="px-4 text-gray-500">OR</span>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>

          {/* Social Login Buttons */}
          <div className="flex items-center mt-4 space-x-4">
            {/* Sign in with Google */}
            <button className="flex items-center justify-center w-full py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition">
              <img
                src="/assets/images/google.png"
                alt="Google"
                className="w-5 h-5 mr-2"
              />
              Sign in with Google
            </button>
            {/* Sign in with GitHub */}
            <button className="flex items-center justify-center w-full py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition">
              <img
                src="/assets/images/github.png"
                alt="GitHub"
                className="w-5 h-5 mr-2"
              />
              Sign in with GitHub
            </button>
          </div>

          {/* Centered Footer */}
          <div className="mt-6 text-center">
            <p className="text-sm text-black">
              Have an Account?{" "}
              <a href="#" className="text-blue-500 hover:underline">
                Sign In
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Right Section: Image */}
      <div className="w-1/2 h-full overflow-auto flex justify-end">
        <img
          src="/assets/images/signup.png"
          alt="Signup"
          className="h-auto"
          style={{
            width: "75%", // Set the image width to 75% of the container
            maxHeight: "100vh", // Ensure it doesn’t exceed the viewport height
            display: "block",
          }}
        />
      </div>
    </div>
  );
};

export default Signup;
