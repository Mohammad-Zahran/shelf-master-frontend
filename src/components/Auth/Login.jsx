import React, { useContext, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { gsap } from "gsap";
import Modal from "./Modal";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "./../../hooks/useAuth";
import Swal from "sweetalert2";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signUpWithGmail, login } = useAuth();
  const axiosPublic = useAxiosPublic();

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

  const onSubmit = async (data) => {
    const email = data.email;
    const password = data.password;

    try {
      const result = await login(email, password);
      const user = result.user;
      const photoURL = user.photoURL || "/assets/images/default-profile.png";

      // Show success alert
      Swal.fire({
        title: "Login Successful!",
        text: "You have successfully logged in.",
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#4682B4",
      });

      navigate(from, { replace: true });

      console.log("Logged-in user details:", {
        email: user.email,
        photoURL,
      });
    } catch (error) {
      console.error("Login failed:", error.message);

      // Show error alert
      Swal.fire({
        title: "Login Failed",
        text: "Please check your credentials and try again.",
        icon: "error",
        confirmButtonText: "Retry",
        confirmButtonColor: "#4682B4",
      });
    }
  };

  // Login with Google
  const handleLoginWithGoogle = () => {
    signUpWithGmail()
      .then((result) => {
        const userInfo = {
          name: result?.user?.displayName,
          email: result?.user?.email,
          photoURL: result.user.photoURL || defaultPhotoURL,
        };

        axiosPublic.post("/users", userInfo).then((response) => {
          // Show success alert
          Swal.fire({
            title: "Login Successful!",
            text: "You have successfully logged in with Google.",
            icon: "success",
            confirmButtonText: "OK",
            confirmButtonColor: "#4682B4",
          });

          navigate(from, { replace: true });
        });
      })
      .catch((error) => {
        console.error("Google Sign-In failed:", error);

        // Show error alert
        Swal.fire({
          title: "Google Sign-In Failed",
          text: "An error occurred while signing in with Google.",
          icon: "error",
          confirmButtonText: "Retry",
          confirmButtonColor: "#4682B4",
        });
      });
  };
  return (
    <div className="flex flex-col lg:flex-row h-screen bg-white">
      {/* Left Section: Login Form */}
      <div
        ref={leftSectionRef}
        className="w-full lg:w-1/2 flex flex-col justify-center items-center px-6 md:px-10"
      >
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-charcoal mb-4 text-center lg:text-left">
            Welcome Back
          </h2>
          <p className="text-steelBlue mb-6 text-center lg:text-left">
            Enter your credentials to log in to your account
          </p>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-steelBlue"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">Email is required</p>
            )}

            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-steelBlue"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">Password is required</p>
            )}

            <button type="submit" className="btn w-full normal">
              Log In
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
            <button
              onClick={handleLoginWithGoogle}
              className="flex items-center justify-center w-full py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition"
            >
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
              Don’t have an account?{" "}
              <Link to="/signup" className="text-steelBlue hover:underline">
                Sign Up
              </Link>
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
          alt="Login"
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

export default Login;
