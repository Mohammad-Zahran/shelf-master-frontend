import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { useQuery } from "@tanstack/react-query";

const useWishList = () => {
  const { user } = useContext(AuthContext);

  const { refetch, data: wishListData = { wishlist: [] }, error } = useQuery({
    queryKey: ["wishlists", user?.email],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:8080/wishlists?email=${user?.email}`
      );
      if (!res.ok) {
        console.error("Failed to fetch wishlist data");
        throw new Error("Failed to fetch wishlist data");
      }
      const data = await res.json();
      return data;
    },
    enabled: !!user?.email, 
  });

  if (error) {
    console.error("Error fetching wishlist:", error);
  }

  return [wishListData.wishlist || [], refetch]; 
};

export default useWishList;
