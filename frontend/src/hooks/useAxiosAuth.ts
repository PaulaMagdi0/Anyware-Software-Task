import { useSelector } from "react-redux";
import { RootState } from "../store";
import axiosInstance from "../services/axios";

const useAxiosAuth = () => {
  const token = useSelector((state: RootState) => state.auth.token);

  // Add the Authorization header
  axiosInstance.interceptors.request.use((config) => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  return axiosInstance;
};

export default useAxiosAuth;
