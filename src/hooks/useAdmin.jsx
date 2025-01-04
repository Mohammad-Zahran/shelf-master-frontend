import React from 'react';
import useAuth from './useAuth'
import useAxiosSecure from './useAxiosSecure';
// Custom hook (presumably) used to make secure HTTP requests, probably wrapping Axios with authentication tokens or similar mechanisms.
import { useQuery } from '@tanstack/react-query';
//  Imported from @tanstack/react-query, likely for handling data fetching with caching and background updates.

const useAdmin = () => {
    const {user} = useAuth();
    // This hook returns some user-related data, presumably including the user's email.
    const axiosSecure = useAxiosSecure();
    // This hook probably returns an Axios instance configured with authentication headers or some other security measures.
    const { refetch, data: isAdmin, isPending: isAdminLoading} = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        queryFn: async () => {
           const res = await axiosSecure.get(`users/admin/${user?.email}`)
           console.log(res.data)
            return res.data?.admin;
        }
    })

    // An async function that performs the actual data fetching. In this case, it sends a request to the server to check if the user is an admin.
  
    return [isAdmin, isAdminLoading]
}

export default useAdmin;

// Overall, this custom hook useAdmin encapsulates the logic related to checking whether a user is an admin,
// including authentication, making secure HTTP requests, and handling data fetching with React Query.
// This hook can be used in React components to conditionally render UI elements based on the admin status of the user.






