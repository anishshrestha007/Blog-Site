import axios from "axios";
import { authProvider } from "./authProvider";

// Create an instance of Axios
const axiosInstance = axios.create();

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Modify the request config here
    // Add your default access token to the Authorization header
    config.headers["Authorization"] =
      "Bearer " + localStorage.getItem("accessToken");

    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const resp = await authProvider.refreshToken();

      if (resp && resp.data && resp.data.data) {
        const access_token = resp.data.data && resp.data.data.accessToken;

        localStorage.setItem("accessToken", access_token);
        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${access_token}`;
        return axiosInstance(originalRequest);
      } else {
        return Promise.reject("Rejected");
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
