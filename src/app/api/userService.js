import axios from "axios";

export const API_BASE_URL = "http://localhost:8080/api";
export const userServices = {
  get: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/user/getAll`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error("Failed to retrieve all user data");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const defaultErrorMessage =
          "An error occurred during getting all user data .";
        const backendErrorData = error.response?.data;
        if (
          backendErrorData &&
          typeof backendErrorData === "object" &&
          backendErrorData.message
        ) {
          throw new Error(backendErrorData.message);
        } else if (typeof backendErrorData === "string") {
          throw new Error(backendErrorData);
        }
        throw new Error(defaultErrorMessage);
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
  getUser: async (userId, jwt) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/user/${userId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: jwt,
        },
      });
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error("Api failed");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.message ||
          error.response?.data?.MESSAGE ||
          `Failed to update problem: ${
            error.response?.statusText || "Unknown error"
          }`;
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
  verify: async (jwt) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/user/verify`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: jwt,
        },
      });
      if (response.status === 200) {
        return response;
      } else {
        throw new Error("Invalid api failed");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        let msg =
          error.response.message ||
          error.response.MESSAGE ||
          `Failed to verify : ${error.response?.statusText || "Unknown error"}`;
        throw new Error(msg);
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
  edit: async (jwt, data) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/user/edit`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: jwt,
        },
      });
      if (response.status === 200 || response.status === 201) {
        return response.data;
      } else {
        throw new Error("Unexpcted error occured.");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        let msg =
          error.response.message ||
          error.response.MESSAGE ||
          `Failed to update : ${error.response?.statusText || "Unknown error"}`;
        throw new Error(msg);
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
