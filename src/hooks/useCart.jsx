import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure"; // Import the secure Axios hook

const useCart = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure(); // Use Axios Secure for authenticated requests

  const {
    refetch,
    data: cartData = { cart: [] },
    error,
  } = useQuery({
    queryKey: ["carts", user?.email],
    queryFn: async () => {
      const response = await axiosSecure.get(`/carts?email=${user?.email}`);
      return response.data; // Return the Axios response data
    },
    enabled: !!user?.email, // Ensure the query runs only when the user is logged in
  });

  if (error) {
    console.error("Error fetching cart:", error);
  }

  return [cartData.cart || [], refetch]; // Access 'cart' key from the response
};

export default useCart;
