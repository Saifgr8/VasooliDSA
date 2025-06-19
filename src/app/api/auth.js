import axios from "axios";

export const API_BASE_URL = "https://vasoolidsabackend-2.onrender.com/api";

export const authServices = {
  register: async (data) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/register`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 201) {
        return response.data;
      } else {
        throw new Error(
          response.data || "Registeration failed after api call was made."
        );
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        let errorMessage = "An error occurred during registration.";
        const backendErrorData = error.response?.data;

        if (
          backendErrorData &&
          typeof backendErrorData === "object" &&
          backendErrorData.message
        ) {
          errorMessage = backendErrorData.message;
        } else if (typeof backendErrorData === "string") {
          errorMessage = backendErrorData;
        }

        throw new Error(errorMessage);
      } else if (error.request) {
        throw new Error(
          "Network error. Please check your connection",
          error.request
        );
      } else {
        throw new Error("An unexpected error occurred.", error.message);
      }
    }
  },
  login: async (data) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/loginP`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        return response;
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        let errorMessage = "An error occurred during registration.";
        const backendErrorData = error.response?.data;

        if (
          backendErrorData &&
          typeof backendErrorData === "object" &&
          backendErrorData.message
        ) {
          errorMessage = backendErrorData.message;
        } else if (typeof backendErrorData === "string") {
          errorMessage = backendErrorData;
        }

        throw new Error(errorMessage);
      } else if (error.request) {
        throw new Error(
          "Network error. Please check your connection",
          error.request
        );
      } else {
        throw new Error("An unexpected error occurred.", error.message);
      }
    }
  },
 
};
