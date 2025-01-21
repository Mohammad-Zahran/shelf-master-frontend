import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure"; // Import the secure Axios hook

const useWishList = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure(); // Use Axios Secure for authenticated requests

  const {
    refetch,
    data: wishListData = { wishlist: [] },
    error,
  } = useQuery({
    queryKey: ["wishlists", user?.email],
    queryFn: async () => {
      const response = await axiosSecure.get(`/wishlists?email=${user?.email}`);
      return response.data; // Axios response data
    },
    enabled: !!user?.email, // Only run the query if the user is logged in
  });

  if (error) {
    console.error("Error fetching wishlist:", error);
  }

  return [wishListData.wishlist || [], refetch];
};

export default useWishList;
