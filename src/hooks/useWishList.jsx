import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { useQuery } from "@tanstack/react-query";

const useWishList = () => {
  const { user } = useContext(AuthContext);

  const { refetch, data: wishListData = { wishlist: [] }, error } = useQuery({
    queryKey: ["wishlists", user?.email],
    queryFn: async () => {
      console.log(`Fetching wishlist for email: ${user?.email}`);
      const res = await fetch(
        `http://localhost:8080/wishlists?email=${user?.email}`
      );
      if (!res.ok) {
        console.error("Failed to fetch wishlist data");
        throw new Error("Failed to fetch wishlist data");
      }
      const data = await res.json();
      console.log("Fetched wishlist data:", data);
      return data;
    },
    enabled: !!user?.email, // Ensure query runs only when user is logged in
  });

  if (error) {
    console.error("Error fetching wishlist:", error);
  }

  return [wishListData.wishlist || [], refetch]; // Access 'wishlist' key from the response
};

export default useWishList;
