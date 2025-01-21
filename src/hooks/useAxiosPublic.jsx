import axios from "axios";

const axiosPublic = axios.create({
  baseURL: `http://localhost:${import.meta.env.VITE_SERVER_PORT}`,
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
