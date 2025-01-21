import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { useQuery } from "@tanstack/react-query";

const useCart = () => {
  const { user } = useContext(AuthContext);
  const token = localStorage.getItem("access-token");
  const { refetch, data: cartData = { cart: [] } } = useQuery({
    queryKey: ["carts", user?.email],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:8000/carts?email=${user?.email}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      if (!res.ok) {
        throw new Error("Failed to fetch wishlist data");
      }
      return res.json();
    },
    enabled: !!user?.email, // Ensure query runs only when user is logged in
  });

  return [cartData.cart || [], refetch]; // Access 'cart' key from the response
};

export default useCart;
