import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { useQuery } from "@tanstack/react-query";

const useWishList = () => {
  const { user } = useContext(AuthContext);
  const { refetch, data: wishListData = [] } = useQuery({
    queryKey: ["wishlist", user?.email],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:8080/wishlists?email=${user?.email}`
      );
      if (!res.ok) {
        throw new Error("Failed to fetch wishlist data");
      }
      return res.json();
    },
    enabled: !!user?.email, // Ensure query runs only when user is logged in
  });

  return [wishListData, refetch];
};

export default useWishList;
