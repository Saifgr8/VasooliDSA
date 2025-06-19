import axios from "axios";
import { API_BASE_URL } from "./auth";

export const problemServices = {
  get: async (userId, jwt) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/problem/getAll/${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: jwt,
          },
        }
      );
      console.log(response.status);
      if (response.status === 200) {
        console.log(response);
        return response.data;
      } else {
        throw new Error(response.data?.message || "Unable to fetch  data");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response.status === 401) {
          throw new Error("Session expired, please log in again.");
        }
        throw new Error(
          error.response?.data?.message || "Unable to fetch all data"
        );
      } else if (error.request) {
        throw new Error("Network error");
      } else {
        throw new Error("An unexpected error occurred.", error.message);
      }
    }
  },
  save: async (data, jwt) => {
    console.log("saving data: ", data);
    try {
      const response = await axios.post(`${API_BASE_URL}/problem/save`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: jwt,
        },
      });
      console.log("response is: ", response);
      if (response.status === 201 || response.status === 200) {
        return response.data;
      } else {
        throw new Error(response.data || "Save failed.");
      }
    } catch (error) {
      console.log("errro is: ", error);
      if (axios.isAxiosError(error)) {
        let defaultErrorMessage = "An error occurred during saving problem.";
        const backendErrorData = error.response?.data;

        if (
          backendErrorData &&
          typeof backendErrorData === "object" &&
          backendErrorData.message
        ) {
          defaultErrorMessage = backendErrorData.message;
        } else if (typeof backendErrorData === "string") {
          defaultErrorMessage = backendErrorData;
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
  delete: async (problem_id, jwt) => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/problem/${problem_id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: jwt,
          },
        }
      );
      if (response.status === 200) {
        return true;
      } else {
        throw new Error(response.data || "Failed here");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        let defaultErrorMessage = "An error occurred during deleting problem.";
        const backendErrorData = error.response?.data;

        if (
          backendErrorData &&
          typeof backendErrorData === "object" &&
          backendErrorData.message
        ) {
          defaultErrorMessage = backendErrorData.message;
        } else if (typeof backendErrorData === "string") {
          defaultErrorMessage = backendErrorData;
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
  edit: async (problem_id, data, jwt) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/problem/${problem_id}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: jwt,
          },
        }
      );
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error(response.data || "Failed here");
      }
    } catch (error) {
      console.log(error);
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
};
