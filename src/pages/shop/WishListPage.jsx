import React, { useContext, useEffect, useState } from "react";
import useWishList from "./../../hooks/useWishList";
import useCart from "../../hooks/useCart";
import { AuthContext } from "../../contexts/AuthProvider";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic"; // Import the custom Axios hook

const WishListPage = () => {
  const axiosPublic = useAxiosPublic(); // Use centralized Axios instance
  const { user } = useContext(AuthContext);
  const [wishlist, refetchWishlist] = useWishList();
  const [cart, refetchCart] = useCart();
  const [localWishlist, setLocalWishlist] = useState([]);

  useEffect(() => {
    setLocalWishlist(wishlist);
  }, [wishlist]);

  const handleDelete = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axiosPublic.delete(`/wishlists/${item._id}`);
          if (response.data.success) {
            refetchWishlist();
            setLocalWishlist((prev) =>
              prev.filter((wishlistItem) => wishlistItem._id !== item._id)
            );
            Swal.fire(
              "Deleted!",
              "Item removed from your wishlist.",
              "success"
            );
          } else {
            Swal.fire(
              "Error!",
              response.data.message || "Failed to delete the item.",
              "error"
            );
          }
        } catch (error) {
          Swal.fire("Error!", "Something went wrong.", "error");
        }
      }
    });
  };

  const handleAddToCart = async (item) => {
    if (!user || !user.email) {
      Swal.fire(
        "Login Required",
        "Please log in to add items to your cart.",
        "warning"
      );
      return;
    }

    const cartItem = {
      productId: item._id,
      name: item.name,
      quantity: 1,
      images: item.images,
      material: item.material,
      price: item.price,
      email: user.email,
    };

    try {
      const response = await axiosPublic.post("/carts", cartItem);
      refetchCart();
      if (response.data?.cart) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Item added to cart successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      Swal.fire("Error!", "Something went wrong.", "error");
    }
  };

  const isItemInCart = (itemId) => {
    return cart.some((cartItem) => cartItem.productId === itemId);
  };

  return (
    <div className="section-container mx-auto p-4 sm:p-6">
      <h1 className="text-3xl font-bold ml-2 sm:ml-5 mb-6 text-charcoal">
        Wishlist
      </h1>
      <div className="flex flex-wrap md:flex-nowrap gap-6">
        <div className="flex-1 bg-white rounded-md p-4 sm:p-6">
          <h2 className="text-xl font-semibold mb-4 text-charcoal">
            Your Wishlist
          </h2>
          {localWishlist.length > 0 ? (
            <div className="space-y-6">
              {localWishlist.map((item, index) => (
                <div
                  key={index}
                  className="relative flex flex-col sm:flex-row gap-6 pb-6 border-b border-gray-300"
                >
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-full sm:w-32 sm:h-32 object-cover rounded"
                  />

                  <div className="flex-1">
                    <h3 className="font-medium text-lg">{item.name}</h3>
                    <p className="text-gray-500 mb-4">
                      Material: {item.material}
                    </p>
                    <button
                      className="mt-4 text-red-600"
                      onClick={() => handleDelete(item)}
                    >
                      Remove
                    </button>
                  </div>

                  <div className="sm:static text-right">
                    <p className="text-lg font-medium">
                      ${item.price.toFixed(2)}
                    </p>
                    {isItemInCart(item._id) ? (
                      <Link
                        to="/cart-page"
                        className="mt-4 btn normal text-white py-2 rounded-md bg-blue-500 w-full sm:w-auto"
                      >
                        View in Cart
                      </Link>
                    ) : (
                      <button
                        className="mt-4 btn normal text-white py-2 rounded-md bg-green-500 w-full sm:w-auto"
                        onClick={() => handleAddToCart(item)}
                      >
                        Add to Cart
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">Your wishlist is empty.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default WishListPage;
