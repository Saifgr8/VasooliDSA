"use client";
import React, { useEffect, useState } from "react";
import { useDarkMode } from "../context/ThemeContext";
import Lottie from "lottie-react";
import moon from "../../../public/moon.json";
import sun from "../../../public/sun.json";

const DarkModeToggler = () => {
  const { darkMode, setDarkMode } = useDarkMode();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return (
      <div
        className="m-2 p-2 bg-blue-300 rounded-xl shadow-lg cursor-pointer hover:bg-blue-500
        dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:text-white"
      >
        Theme loading... Please wait
      </div>
    );
  }

  return (
    <div>
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="m-2 p-2 bg-blue-500 rounded-xl shadow-lg dark:shadow- cursor-pointer hover:bg-blue-900
                   dark:bg-indigo-600 dark:hover:bg-indigo-300 dark:text-white shadow-slate-800 dark:shadow-white"
      >
        {darkMode ? (
          <div className="flex justify-center items-center gap-2">
            Light <Lottie animationData={sun} className="h-16 w-16"/>
          </div>
        ) : (
          <div className="flex justify-center items-center gap-2">
            Dark <Lottie animationData={moon} className="h-16 w-16"/>
          </div>
        )}
      </button>
    </div>
  );
};

export default DarkModeToggler;
