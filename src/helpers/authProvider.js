import axios from "axios";
import axiosInstance from "./axiosInstance";

export const authProvider = {
  isAuthenticated: false,
  userName: "",

  async login(email, password) {
    try {
      const response = await axios.post("auth/signin", null, {
        params: {
          email: email,
          password: password,
        },
      });

      if (response.data.success) {
        this.isAuthenticated = true;
        this.userName = email;
        localStorage.setItem("accessToken", response.data.data.accessToken);
        localStorage.setItem("refreshToken", response.data.data.refreshToken);
        localStorage.setItem("userName", email);
      }

      return response;
    } catch (error) {
      throw error;
    }
  },

  async register(email, password) {
    try {
      const response = await axios.post("auth/signup", null, {
        params: {
          email: email,
          password: password,
        },
      });

      if (response.data.success) {
        this.isAuthenticated = true;
        this.userName = email;
        localStorage.setItem("accessToken", response.data.data.accessToken);
        localStorage.setItem("refreshToken", response.data.data.refreshToken);
      }

      return response;
    } catch (error) {
      throw error;
    }
  },

  async logout() {
    try {
      const response = await axiosInstance.get("auth/signout");

      if (response.data.success) {
        this.isAuthenticated = false;
        this.userName = "";
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      }

      return response;
    } catch (error) {
      throw error;
    }
  },

  async refreshToken() {
    try {
      const response = await axiosInstance.get("auth/refreshToken", {
        headers: {
          refreshToken: localStorage.getItem("refreshToken"),
        },
      });

      if (response.data.success) {
        this.isAuthenticated = true;
        this.userName = authProvider.userName;
        localStorage.setItem("accessToken", response.data.data.accessToken);
      }

      return response;
    } catch (error) {
      if (error.response.status === 500 || error.response.status === 401) {
        await authProvider.logout();
        window.location.href = "/login";
      }
    }
  },
};
