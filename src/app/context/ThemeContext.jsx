// src/app/context/ThemeContext.jsx
"use client"; // Important for client-side context and hooks

import React, { createContext, useState, useEffect, useContext } from "react";

const ThemeContext = createContext(undefined); // Initialize with undefined, as context value will be an object

export const ThemeProvider = ({ children }) => {
  // Check localStorage safely on the client-side
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") { // Check if window (browser) is defined
      return localStorage.getItem("theme") === "dark";
    }
    return false; // Default to light on server, or if localStorage isn't available
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]); // Dependency array should include darkMode so effect re-runs on change

  return (
    // FIX: Use ThemeContext.Provider, not .prototype
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useDarkMode = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useDarkMode must be used within a ThemeProvider");
  }
  return context;
};