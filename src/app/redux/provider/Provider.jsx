"use client";
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "../store/store";
import { initializeAuth } from "../slices/authSlice";

const Providers = ({ children }) => {
  useEffect(() => {
    const token = localStorage.getItem("JWTtoken");
    const userId = localStorage.getItem("userId");

    if (token && userId) {
      try {
        store.dispatch(initializeAuth({ userId, token }));
      } catch (error) {
        console.error("Failed to parse user data, pelase log in again");
        localStorage.removeItem("JWTtoken");
        localStorage.removeItem("userId");
      }
    }
  }, []);
  return <Provider store={store}>{children}</Provider>;
};

export default Providers;
