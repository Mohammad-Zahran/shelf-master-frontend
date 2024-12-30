import React from "react";
import { Link } from "react-router-dom";
import { FaGoogle, FaFacebookF, FaGithub } from "react-icons/fa";
import { useForm } from "react-hook-form";
import SignUpImage from "../../../public/assets/images/signup.png";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <div className="flex flex-col lg:flex-row items-center justify-between min-h-screen bg-white">
      {/* Left Section - Form */}
      <div className="w-full lg:w-1/2 max-w-md mx-auto p-8">
        <h3 className="font-bold text-2xl text-center text-steelBlue">
          Get Started Now
        </h3>
        <p className="text-center text-gray-500 mb-6">
          Enter your credentials to access your account
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="Name"
              className="input border border-gray-300 rounded w-full p-2 focus:outline-none focus:ring-2 focus:ring-steelBlue"
              {...register("name")}
            />
          </div>

          {/* Email */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="Email"
              className="input border border-gray-300 rounded w-full p-2 focus:outline-none focus:ring-2 focus:ring-steelBlue"
              {...register("email")}
            />
          </div>

          {/* Password */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Password"
              className="input border border-gray-300 rounded w-full p-2 focus:outline-none focus:ring-2 focus:ring-steelBlue"
              {...register("password")}
            />
          </div>

          {/* Submit Button */}
          <div className="form-control mt-6">
            <input
              type="submit"
              value="Sign Up"
              className="btn bg-steelBlue text-white hover:bg-transparent hover:text-steelBlue border hover:border-steelBlue w-full"
            />
          </div>
        </form>

        {/* Social Sign-in */}
        <div className="divider my-6">Or sign in with</div>
        <div className="flex justify-center space-x-4">
          <button className="btn btn-circle bg-gray-100 hover:bg-gray-200">
            <FaGoogle className="text-red-500" />
          </button>
          <button className="btn btn-circle bg-gray-100 hover:bg-gray-200">
            <FaFacebookF className="text-blue-500" />
          </button>
          <button className="btn btn-circle bg-gray-100 hover:bg-gray-200">
            <FaGithub className="text-gray-700" />
          </button>
        </div>

        <p className="text-center text-gray-500 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-steelBlue font-medium underline">
            Log In
          </Link>
        </p>
      </div>

      {/* Right Section - Image */}
      <div className="hidden lg:flex items-center justify-end w-full lg:w-1/2 h-full">
        <img
          src={SignUpImage}
          alt="Sign Up Illustration"
          className="w-auto h-5/6 rounded-lg shadow-none"
        />
      </div>
    </div>
  );
};

export default Signup;
