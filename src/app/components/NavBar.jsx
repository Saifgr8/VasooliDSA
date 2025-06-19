"use client";
import React, { useEffect, useState } from "react";
import DarkModeToggler from "./DarkModeToggler";
import { useRouter } from "next/navigation";
import { ThemeProvider } from "../context/ThemeContext";
import MyButton from "./MyButton";
import Lottie from "lottie-react";
import hello from "../../../public/hello.json";
import { useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { useSelector } from "react-redux";

const NavBar = () => {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const apiError = useSelector((state) => state.auth.apiError);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navigateWorld = () => {
    router.push("/");
  };
  const navigateDashboard = () => {
    router.push("/dashboard");
  };
  const navigateLogin = () => {
    router.push("/login");
  };

  const navigateLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  if (!mounted) {
    return null;
  }

  return (
    <ThemeProvider>
      <div
        className="md:hidden flex justify-evenly items-center sticky w-full bg-blue-400 bg-gradient-to-r from-blue-200 via-blue-400 to-blue-500
        dark:bg-gradient-to-r dark:from-blue-700 dark:via-blue-950 dark:to-slate-900 dark:text-white pb-2"
      >
        <button className="cursor-pointer" onClick={navigateWorld}>
          <Lottie animationData={hello} loop={true} />
        </button>
        <DarkModeToggler />
        <div className="flex justify-center items-center flex-col gap-1">
          <MyButton
            className="cursor-pointer"
            text={"Dashboard"}
            onClick={navigateDashboard}
          ></MyButton>
          {apiError || !isAuthenticated ? (
            <MyButton text={"Login"} onClick={navigateLogin} />
          ) : (
            <MyButton text={"Logout"} onClick={navigateLogout} />
          )}
        </div>
      </div>
      <div
        className="hidden md:flex justify-evenly items-center sticky w-full bg-blue-400 bg-gradient-to-r from-blue-200 via-blue-400 to-blue-500
          dark:bg-gradient-to-r dark:from-blue-700 dark:via-blue-950 dark:to-slate-900 dark:text-white italic pb-2"
      >
        <div className=" w-1/2 text-center">
          <button className="cursor-pointer" onClick={navigateWorld}>
            <span className="lg:text-4xl md:text-2xl text-xl">
              <Lottie
                animationData={hello}
                loop={true}
                className="h-1/2 w-1/2"
              />
            </span>
          </button>
        </div>
        <div className="flex justify-evenly items-center gap-4">
          <DarkModeToggler />
          <MyButton
            className="cursor-pointer"
            text={"Dashboard"}
            onClick={navigateDashboard}
          ></MyButton>

          {apiError || !isAuthenticated ? (
            <MyButton text={"Login"} onClick={navigateLogin} />
          ) : (
            <MyButton text={"Logout"} onClick={navigateLogout} />
          )}
        </div>
      </div>
    </ThemeProvider>
  );
};

export default NavBar;
