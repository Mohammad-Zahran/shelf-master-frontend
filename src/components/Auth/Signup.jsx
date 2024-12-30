import React from "react";
import { Link } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { useForm } from "react-hook-form";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <div className="max-w-md bg-white shadow w-full mx-auto flex items-center justify-center my-20">
      <div
        className="modal-action flex flex-col justify-center mt-0"
        method="dialog"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
          <h3 className="font-bold text-lg">Get Started Now</h3>
          <p>Enter your Credentials to access your account</p>

          {/*Name*/}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="name"
              className="input input-bordered"
              {...register("name")}
            />
          </div>

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
    </div>
  );
};

export default Signup;
