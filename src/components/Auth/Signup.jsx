import React from "react";
import { Link } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { useForm } from "react-hook-form";

const Signup = () => {
  return (
    <div
      className="modal-action flex flex-col justify-center mt-0"
      method="dialog"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="card-body">
        <h3 className="font-bold text-lg">Please Login</h3>

        {/* email */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            placeholder="email"
            className="input input-bordered"
            {...register("email")}
          />
        </div>

        {/* password */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            placeholder="password"
            className="input input-bordered"
            {...register("password")}
          />
          <label className="label mt-1">
            <a href="#" className="label-text-alt link link-hover">
              Forgot password?
            </a>
          </label>
        </div>

        {/* error */}

        {/* login btn */}
        <div className="form-control mt-6">
          <input type="submit" value="Login" className="btn normal" />
        </div>

        <p className="text-center my-2">
          Don't have an account?{" "}
          <Link to="/signup" className="underline text-steelBlue ml-1">
            Signup Now
          </Link>
        </p>
      </form>

      {/* Social sign in */}
      <div className="text-center space-3 mb-5">
        <button className="btn btn-circle normal">
          <FaGoogle />
        </button>
        <button className="btn btn-circle normal">
          <FaFacebookF />
        </button>
        <button className="btn btn-circle normal">
          <FaGithub />
        </button>
      </div>
    </div>
  );
};

export default Signup;
