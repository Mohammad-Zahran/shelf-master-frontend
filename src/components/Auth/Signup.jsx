import React, { useContext, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { gsap } from "gsap";
import Modal from "./Modal";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { AuthContext } from "../../contexts/AuthProvider";
import axios from "axios";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signupWithGmail, createUser, updateuserProfile } =
    useContext(AuthContext);

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  // Refs for animation
  const leftSectionRef = useRef(null);
  const rightSectionRef = useRef(null);

  useEffect(() => {
    // Animate the left section
    gsap.fromTo(
      leftSectionRef.current,
      { opacity: 0, x: -100 },
      { opacity: 1, x: 0, duration: 1 }
    );

    // Animate the right section
    gsap.fromTo(
      rightSectionRef.current,
      { opacity: 0, x: 100 },
      { opacity: 1, x: 0, duration: 1 }
    );
  }, []);

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;
    createUser(email, password)
      .then((result) => {
        const user = result.user;
        updateuserProfile(data.email, data.photoURL).then(() => {
          const userInfo = {
            name: data.name,
            email: data.email,
          };
          axios
            .post("http://localhost:8080/users", userInfo)
            .then((response) => {
              alert("Account creation successfully done!");
              document.getElementById("my_modal_5").close();
              navigate(from, { replace: true });
            });
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  // login with google
  

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-white">
      {/* Left Section: Signup Form */}
      <div
        ref={leftSectionRef}
        className="w-full lg:w-1/2 flex flex-col justify-center items-center px-6 md:px-10"
      >
        <div className="w-full max-w-md" method="dialog">
          <h2 className="text-3xl font-bold text-charcoal mb-4 text-center lg:text-left">
            Get Started Now
          </h2>
          <p className="text-steelBlue mb-6 text-center lg:text-left">
            Enter your credentials to access your account
          </p>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-steelBlue"
              {...register("name")}
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-steelBlue"
              {...register("email")}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-steelBlue"
              {...register("password")}
            />
            <div className="flex items-center gap-2">
              <input type="checkbox" id="terms" />
              <label htmlFor="terms" className="text-sm text-black">
                I agree to the terms & policy
              </label>
            </div>
            <button type="submit" value="Login" className="btn w-full normal">
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
          <div className="flex flex-col md:flex-row items-center md:space-x-4 space-y-4 md:space-y-0 mt-4">
            <button className="flex items-center justify-center w-full py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition">
              <img
                src="/assets/images/google.png"
                alt="Google"
                className="w-5 h-5 mr-2"
              />
              Sign in with Google
            </button>
            <button className="flex items-center justify-center w-full py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition">
              <img
                src="/assets/images/facebook.png"
                alt="Facebook"
                className="w-5 h-5 mr-2"
              />
              Sign in with Facebook
            </button>
          </div>

          {/* Centered Footer */}
          <div className="mt-6 text-center">
            <p className="text-sm text-black">
              Have an Account?{" "}
              <button
                onClick={() =>
                  document.getElementById("my_modal_5").showModal()
                }
                className="text-blue-500 hover:underline"
              >
                Sign In
              </button>{" "}
            </p>
            <Link
              to="/"
              className="flex items-center gap-2 text-steelBlue font-medium absolute top-4 left-4 hover:text-gray-600 transition-all text-sm md:text-base"
            >
              <FaArrowAltCircleLeft className="text-lg" /> Home
            </Link>
          </div>
        </div>
      </div>
      <Modal />

      {/* Right Section: Image */}
      <div
        ref={rightSectionRef}
        className="hidden lg:flex w-1/2 h-full overflow-auto justify-end"
      >
        <img
          src="/assets/images/signup.png"
          alt="Signup"
          className="h-auto"
          style={{
            width: "75%",
            maxHeight: "100vh",
            display: "block",
          }}
        />
      </div>
    </div>
  );
};

export default Signup;
