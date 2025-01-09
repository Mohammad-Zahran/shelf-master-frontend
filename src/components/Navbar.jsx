import React from "react";
import { useLocation, Link } from "react-router-dom";
import logo from "../../public/assets/images/logo.png";
import { FaRegUser, FaRegHeart } from "react-icons/fa";
import Modal from "./Auth/Modal";
import Profile from "./Auth/Profile";
import useCart from "../hooks/useCart";
import useWishList from "../hooks/useWishList";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const { user } = useAuth();
  const [cart] = useCart();
  const [wishlist] = useWishList();

  const wishListCount = wishlist?.length || 0;

  const navItems = (
    <>
      <li
        className={`hover:text-steelBlue hover:bg-transparent active:bg-transparent ${
          currentPath === "/" ? "text-steelBlue font-bold" : ""
        }`}
      >
        <Link to="/">Home</Link>
      </li>
      <li
        className={`hover:text-steelBlue hover:bg-transparent active:bg-transparent ${
          currentPath === "/products" ? "text-steelBlue font-bold" : ""
        }`}
      >
        <Link to="/products">Shelves</Link>
      </li>
      <li
        className={`hover:text-steelBlue hover:bg-transparent active:bg-transparent ${
          currentPath === "/review-page" ? "text-steelBlue font-bold" : ""
        }`}
      >
        <Link to="/review-page">Add Review</Link>
      </li>
      <li
        className={`hover:text-steelBlue hover:bg-transparent active:bg-transparent ${
          currentPath === "/floor-planner" ? "text-steelBlue font-bold" : ""
        }`}
      >
        <Link to="/floor-planner">3D Floor Planner</Link>
      </li>
      <li
        className={`hover:text-steelBlue hover:bg-transparent active:bg-transparent ${
          currentPath === "/assistant-ai" ? "text-steelBlue font-bold" : ""
        }`}
      >
        <Link to="/assistant-ai">Shelf Assistant AI</Link>
      </li>
      <li
        className={`hover:text-steelBlue hover:bg-transparent active:bg-transparent ${
          currentPath === "/contact" ? "text-steelBlue font-bold" : ""
        }`}
      >
        <Link to="/contact">Contact Us</Link>
      </li>
    </>
  );

  return (
    <header className="max-w-screen-2xl container mx-auto">
      <nav className="navbar xl:px-24">
        <div className="navbar bg-base-100">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                {navItems}
              </ul>
            </div>
            <a href="/">
              <img width={120} height={60} src={logo} alt="Logo" />
            </a>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">{navItems}</ul>
          </div>
          <div className="navbar-end">
            <Link to="wishlist-page">
              <label
                tabIndex={0}
                role="button"
                className="btn-circle mr-3 flex items-center justify-center group"
              >
                <div className="indicator">
                  <FaRegHeart className="h-5 w-5 text-black group-hover:text-steelBlue transition-colors duration-200" />
                  <span className="badge badge-sm indicator-item">
                    {wishListCount}
                  </span>
                </div>
              </label>
            </Link>

            <Link to="cart-page">
              <label
                tabIndex={0}
                role="button"
                className="btn-cart btn-circle mr-3 flex items-center justify-center"
              >
                <div className="indicator">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <span className="badge badge-sm indicator-item">
                    {cart?.length || 0}
                  </span>
                </div>
              </label>
            </Link>

            {user ? (
              <Profile user={user} />
            ) : (
              <button
                onClick={() =>
                  document.getElementById("my_modal_5").showModal()
                }
                className="btn round"
              >
                <FaRegUser /> Login
              </button>
            )}
            <Modal />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
