import { useQuery } from "@tanstack/react-query";
import React from "react";

const Users = () => {
  const { refetch, data: users = { cart: [] } } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch(`http://localhost:8080/users`);
      return res.json();
    },
  });
  console.log(users);

  return <div>Users</div>;
};

export default Users;
