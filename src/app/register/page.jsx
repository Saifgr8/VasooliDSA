"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ThemeProvider } from "../context/ThemeContext";
import { BiSolidHide } from "react-icons/bi";
import { BiSolidShow } from "react-icons/bi";
import { FaGoogle } from "react-icons/fa";
import Lottie from "lottie-react";
import cube from "../../../public/Cube.json";
import Link from "next/link";
import { authServices } from "../api/auth";
import { useRouter } from "next/navigation";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { API_BASE_URL } from "../api/userService";
import { useDispatch } from "react-redux";
import { loginSucess } from "../redux/slices/authSlice";
import { setApiError } from "../redux/slices/authSlice";

const page = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [errorApi, setErrorApi] = useState("");
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleGoogleLoginSucess = async (tokenResponse) => {
    setErrorApi("");
    try {
      const response = await axios.post(
        `${API_BASE_URL}/auth/google/callback`,
        {
          googleAccessToken: tokenResponse.access_token,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const jwt = response.headers.authorization;
      if (jwt) {
        dispatch(loginSucess({ userId: response.data.id, token: jwt }));
        dispatch(clearApiError());
        setErrorApi("");
        router.push("/");
      }
    } catch (error) {
      setErrorApi(error.message);
      dispatch(setApiError());
    }
  };
  const handleGoogleLoginError = (error) => {
    setErrorApi(error.message);
  };

  const googleLogin = useGoogleLogin({
    onSuccess: handleGoogleLoginSucess,
    onError: handleGoogleLoginError,
    scope: "email profile openid",
  });

  const mySubmit = async (data) => {
    setErrorApi("");
    try {
      const responseData = await authServices.register({
        username: data.username,
        email: data.email,
        password: data.password,
      });

      reset();
      router.push("/login");
    } catch (error) {
      setErrorApi(error.message);
      console.error("Error making call to axios", error.message);
    }
  };

  if (!isMounted) return null;

  return (
    <div>
      <ThemeProvider>
        <div className="flex flex-col justify-center items-center min-h-screen w-full dark:bg-slate-900 dark:text-white relative text-center">
          <Lottie animationData={cube} className="lg:h-2/3 lg:w-2/3" />
          <form
            className="w-1/2 lg:w-1/3 absolute bg-white/30 dark:bg-slate-600/20 backdrop-blur-md m-2 p-2 rounded-xl "
            onSubmit={handleSubmit(mySubmit)}
          >
            <span className="text-black md:text-4xl text-xl ">Register</span>
            <div className="flex flex-col justify-evenly items-start ">
              <label
                htmlFor="username"
                className="mt-1 p-1 md:text-sm text-xs dark:text-white"
              >
                Username
              </label>
              <input
                className="mb-1 p-1 rounded-md shadow-md border-2 border-gray-400 w-full dark:border-white dark:text-white bg-transparent"
                type="username"
                id="username"
                {...register("username")}
                placeholder="xyz12"
              />
              {errors.username && <span>{errors.username.message}</span>}
            </div>
            <div className="flex flex-col justify-evenly items-start ">
              <label
                htmlFor="email"
                className="mt-1 p-1 md:text-sm text-xs dark:text-white"
              >
                Email
              </label>
              <input
                className="mb-1 p-1 rounded-md shadow-md border-2 border-gray-400 w-full dark:border-white dark:text-white bg-transparent"
                type="email"
                id="email"
                {...register("email")}
                placeholder="xyz@gmail.com"
              />
              {errors.email && <span>{errors.email.message}</span>}
            </div>
            <div className="flex flex-col justify-evenly items-start mb-4">
              <label
                htmlFor="email"
                className="mt-1 p-1 md:text-sm text-xs dark:text-white"
              >
                Password
              </label>
              <div className="relative w-full">
                <input
                  className="mb-1 p-1 rounded-md shadow-md border-2 border-gray-400 w-full dark:border-white dark:text-white bg-transparent"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  {...register("password")}
                  placeholder="**********"
                />
                <button
                  type="button"
                  className="absolute top-2 right-1 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <BiSolidHide className="h-4 w-4 md:h-6 md:w-6" />
                  ) : (
                    <BiSolidShow className="h-4 w-4 md:h-6 md:w-6" />
                  )}
                </button>
              </div>
              {errors.password && <span>{errors.password.message}</span>}
            </div>
            <button className="px-4 py-2 bg-transparent rounded-xl shadow-xl mt-1 dark:shadow-white shadow-slate-800 cursor-pointer">
              Sign in
            </button>
            <hr className="m-3" />
            <div className="flex flex-col justify-center items-center">
              <div className="flex flex-col justify-center items-center mt-4">
                <span>Log in with Google</span>
                <FaGoogle
                  onClick={() => googleLogin()}
                  className="h-10 w-10 md:h-12 md:w-12 cursor-pointer"
                />
              </div>
              {errorApi && (
                <p className="text-red-500 italic m-2  ">{errorApi}</p>
              )}
              <pre className="mt-1">or</pre>
              <span className="">
                Already registered?{" "}
                <Link href="/login" passHref>
                  <button
                    type="button"
                    className="underline italic border-2 rounded-lg px-2 cursor-pointer"
                  >
                    Login
                  </button>
                </Link>
              </span>
            </div>
          </form>
        </div>
      </ThemeProvider>{" "}
    </div>
  );
};

export default page;
