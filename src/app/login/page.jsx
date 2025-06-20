"use client";
import React, { useEffect, useState } from "react";
import { ThemeProvider } from "../context/ThemeContext";
import Lottie from "lottie-react";
import brain from "../../../public/lottieCube.json";
import { useForm } from "react-hook-form";
import { BiSolidHide } from "react-icons/bi";
import { BiSolidShow } from "react-icons/bi";
import { FaGoogle } from "react-icons/fa";
import { authServices } from "../api/auth";
import { useRouter } from "next/navigation";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { API_BASE_URL } from "../api/auth";
import { useDispatch } from "react-redux";
import {
  loginSucess,
  setApiError,
  clearApiError,
} from "../redux/slices/authSlice";

const page = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [errorApi, setErrorApi] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleGoogleLoginSucess = async (tokenRespose) => {
    setErrorApi("");
    try {
      const backendRresponse = await axios.post(
        `${API_BASE_URL}/auth/google/callback`,
        {
          googleAccessToken: tokenRespose.access_token,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const jwt = backendRresponse.headers.authorization;
      if (jwt) {
        dispatch(loginSucess({ userId: backendRresponse.data.id, token: jwt }));
        dispatch(clearApiError());
        window.alert("Login successful, redirecting to home page");
        setTimeout(() => {
          router.push("/");
        }, 500);
      } else {
        throw new Error("Backend did not return a JWT token.");
      }
    } catch (error) {
      console.error(
        "Error sending Google token to backend or processing backend response:",
        error
      );
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to authenticate with backend.";
      setErrorApi(errorMessage);
      dispatch(setApiError());
    }
  };

  const handleGoogleLoginError = (error) => {
    {
      console.error(
        "Google login failed (frontend errorResponse):",
        errorResponse
      );
      setErrorApi("Google Login failed. Please try again.");
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: handleGoogleLoginSucess,
    onError: handleGoogleLoginError,
    scope: "email profile openid",
  });

  const mySubmit = async (data) => {
    setErrorApi("");
    try {
      const responseData = await authServices.login({
        email: data.email,
        password: data.password,
      });

      const jwt = responseData.headers.authorization;

      dispatch(loginSucess({ userId: responseData.data.id, token: jwt }));

      reset();
      window.alert("Login successful, redirecting to home page");
      setTimeout(() => {
        router.push("/");
      }, 500);
    } catch (error) {
      setErrorApi(error.message);
    }
  };

  return (
    <ThemeProvider>
      <div className="flex flex-col justify-center items-center min-h-screen w-full dark:bg-slate-900 dark:text-white relative text-center">
        <Lottie animationData={brain} />
        <form
          onSubmit={handleSubmit(mySubmit)}
          className="w-2/3 md:w-1/3 absolute bg-white/30 dark:bg-slate-600/20 backdrop-blur-md m-2 p-2 rounded-xl"
        >
          <span className="text-black dark:text-white md:text-4xl text-xl ">
            Login
          </span>
          <div className="flex flex-col justify-evenly items-start ">
            <label
              htmlFor="email"
              className="mt-1 p-1 md:text-sm text-xs dark:text-white"
            >
              Email
            </label>
            <input
              className="mb-1 p-1 rounded-md shadow-md border-2 border-gray-400 w-full dark:border-white dark:text-white"
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
                className="mb-1 p-1 rounded-md shadow-md border-2 border-gray-400 w-full dark:border-white dark:text-white"
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
                  <BiSolidHide className="h-4 w-4 md:h-6 md:w-6 dark:text-black" />
                ) : (
                  <BiSolidShow className="h-4 w-4 md:h-6 md:w-6 dark:text-black" />
                )}
              </button>
            </div>
            {errors.password && <span>{errors.password.message}</span>}
          </div>
          <div className="flex justify-center items-center mb-4">
            <button className="px-4 py-2 bg-transparent rounded-xl shadow-xl mt-1 dark:shadow-white shadow-slate-800 cursor-pointer dark:text-white">
              Log in
            </button>
          </div>
          {errorApi && <p className="text-red-500 italic m-2 ">{errorApi}</p>}
          <hr />
          <div className="flex flex-col justify-center items-center my-4">
            <p>
              New to the app? Please{" "}
              <button
                type="button"
                onClick={() => router.push("/register")}
                className="underline italic border-2 rounded-lg px-2 cursor-pointer"
              >
                Register
              </button>
            </p>
            <pre>or</pre>
            <span>Log in with Google</span>
            <FaGoogle
              onClick={() => googleLogin()}
              className="h-10 w-10 md:h-12 md:w-12 cursor-pointer"
            />
          </div>
        </form>
      </div>
    </ThemeProvider>
  );
};

export default page;
