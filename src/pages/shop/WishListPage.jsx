import React, { useContext } from "react";
import useWishList from "./../../hooks/useWishList";
import useCart from "../../hooks/useCart";
import { AuthContext } from "../../contexts/AuthProvider";
import Swal from "sweetalert2";

const WishListPage = () => {
  const [wishlist, refetchWishlist] = useWishList();
  const [cart, refetchCart] = useCart();
  const { user } = useContext(AuthContext);

  const handleDelete = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:8080/wishlists/${item._id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              refetchWishlist();
              Swal.fire("Deleted!", "Item removed from your wishlist.", "success");
            } else {
              Swal.fire("Error!", data.message || "Failed to delete the item.", "error");
            }
          })
          .catch(() => Swal.fire("Error!", "Something went wrong.", "error"));
      }
    });
  };

  const handleAddToCart = (item) => {
    if (!user || !user.email) {
      Swal.fire("Login Required", "Please log in to add items to your cart.", "warning");
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

    fetch("http://localhost:8080/carts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cartItem),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          refetchCart();
          Swal.fire("Success", "Item added to cart successfully!", "success");
        }
      })
      .catch(() => Swal.fire("Error!", "Something went wrong.", "error"));
  };

  return (
    <div className="section-container mx-auto p-4 sm:p-6">
      <h1 className="text-3xl font-bold ml-2 sm:ml-5 mb-6 text-charcoal">Wishlist</h1>
      <div className="flex flex-wrap md:flex-nowrap gap-6">
        <div className="flex-1 bg-white rounded-md p-4 sm:p-6">
          <h2 className="text-xl font-semibold mb-4 text-charcoal">Your Wishlist</h2>
          {wishlist.length > 0 ? (
            <div className="space-y-6">
              {wishlist.map((item, index) => (
                <div
                  key={index}
                  className="relative flex flex-wrap sm:flex-nowrap gap-6 pb-6 border-b border-gray-300"
                >
                    <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded"
                  />
                  
                  <div className="flex-1">
                    <h3 className="font-medium text-lg">{item.name}</h3>
                    <p className="text-gray-500 mb-4">Material: {item.material}</p>
                    <button
                      className="mt-4 text-red-600"
                      onClick={() => handleDelete(item)}
                    >
                      Remove
                    </button>
                  </div>
                  <div className="absolute sm:static top-0 right-0 sm:right-auto text-right">
                    <p className="text-lg font-medium">${item.price.toFixed(2)}</p>
                    <button
                      className="mt-4 w-full bg-green-500 text-white py-2 rounded-md"
                      onClick={() => handleAddToCart(item)}
                    >
                      Add to Cart
                    </button>
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
