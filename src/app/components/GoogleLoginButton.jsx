import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { API_BASE_URL } from "../api/auth";

const GoogleLoginButton = ({ onSuccess, onError }) => {
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const backendResponse = await axios.post(
          `${API_BASE_URL}/auth/google/login`,
          {
            googleAccessToken: tokenResponse.access_token,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (onSuccess) {
          onSuccess(backendResponse.data);
        }
      } catch (error) {
        console.error(
          "Error sending Google token to backend:",
          backendError.response?.data || backendError.message
        );
        if (onError) {
          onError(
            backendError.response?.data?.message ||
              "Failed to authenticate with backend."
          );
        }
      }
    },
    onError: (errorResponse) => {
      console.error("Google login failed: ", errorResponse);
      if (onError) {
        onError("Google Login failed. Please try again.");
      }
    },
    scope: "email profile",
    responseType: "code",
  });

  return (
    <button
      onClick={() => login()} // Trigger the Google login flow on button click
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "10px 20px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        
        cursor: "pointer",
        fontSize: "16px",
        gap: "10px",
        width: "100%",
        boxSizing: "border-box", // Include padding in width
      }}
    >
      {/* You'll need to add your Google 'G' icon here. */}
      {/* For example, an <img> tag or an SVG */}
      <img
        src="https://www.gstatic.com/images/branding/product/1x/google_glogo_color_20dp.png"
        alt="Google G logo"
        style={{ width: "20px", height: "20px" }}
      />
      Log in with Google
    </button>
  );
};
export default GoogleLoginButton;
