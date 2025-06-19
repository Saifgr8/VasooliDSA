"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import MyButton from "../MyButton"; // Assuming MyButton is available
import { FaUserCircle } from "react-icons/fa"; // For default profile picture preview
import { userServices } from "@/app/api/userService";

const EditUserForm = ({ user, triggerChange, onClose }) => {
  const [apiError, setApiError] = useState(null); // Changed to null to store error message
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [profilePicPreview, setProfilePicPreview] = useState(
    user?.profilePicUrl || ""
  );

  const {
    register,
    handleSubmit,
    watch,
    setValue, // Added setValue to manually update form values
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: user?.username || "",
      email: user?.email || "",
      profilePicUrl: user?.profilePicUrl || "", // For displaying current URL
    },
  });

  // Watch profilePicUrl field for live preview
  const watchedProfilePicUrl = watch("profilePicUrl");

  // Update preview when URL changes
  useEffect(() => {
    setProfilePicPreview(watchedProfilePicUrl);
  }, [watchedProfilePicUrl]);

  // Handle form submission
  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setApiError(null); // Clear previous errorsclg
    const jwt = localStorage.getItem("JWTtoken");
    if (!jwt) {
      onClose();
      return;
    }
    try {
      const response = await userServices.edit(jwt, {
        username: data.username,
      });
      triggerChange();
      onClose();
    } catch (error) {
      setApiError(error.message);
      setApiError(error.message); // Default error message

      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("API Error Status:", error.response.status);
        console.error("API Error Data:", error.response.data);

        if (error.response.status === 401 || error.response.status === 403) {
          setApiError("Your session has expired. Redirecting to login...");
          setTimeout(() => {
            router.push("/login");
          }, 2000);
        } else {
          setApiError(`Error: ${error.response.data.message || error.message}`);
        }
      } else if (error.request) {
        // The request was made but no response was received
        setApiError("Network error. Please check your internet connection.");
      } else {
        // Something else happened in setting up the request that triggered an Error
        setApiError("An unexpected error occurred.");
      }
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full flex justify-center items-center dark:text-white fixed inset-0 backdrop-blur-xl z-50 bg-black/30 flex-col">
      <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-6 text-center">
        Edit Profile
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Profile Picture Preview */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative w-28 h-28 flex-shrink-0 mb-4">
            {profilePicPreview ? (
              <img
                src={profilePicPreview}
                alt="Profile Preview"
                className="w-full h-full rounded-full object-cover border-4 border-indigo-200 shadow-md ring-2 ring-indigo-300 ring-offset-2 ring-offset-white dark:ring-offset-gray-800"
              />
            ) : (
              <FaUserCircle className="w-full h-full text-gray-400 dark:text-gray-500" />
            )}
          </div>
        </div>

        {/* Username Field */}
        <div>
          <label
            htmlFor="username"
            className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
          >
            Username
          </label>
          <input
            id="username"
            type="text"
            {...register("username", {
              required: "Username is required",
              minLength: {
                value: 3,
                message: "Username must be at least 3 characters",
              },
            })}
            className={`shadow appearance-none border ${
              errors.username
                ? "border-red-500"
                : "border-gray-300 dark:border-gray-600"
            } rounded-lg w-full py-3 px-4 text-gray-700 dark:text-gray-200 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50 dark:bg-gray-700`}
            placeholder="Enter your username"
          />
          {errors.username && (
            <p className="text-red-500 text-xs italic mt-1">
              {errors.username.message}
            </p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label
            htmlFor="email"
            className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            readOnly
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Invalid email address",
              },
            })}
            className={`shadow appearance-none border cursor-not-allowed ${
              errors.email
                ? "border-red-500"
                : "border-gray-300 dark:border-gray-600"
            } rounded-lg w-full py-3 px-4 text-gray-700 dark:text-gray-200 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50 dark:bg-gray-700`}
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="text-red-500 text-xs italic mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* API Error Display */}
        {apiError && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative"
            role="alert"
          >
            <span className="block sm:inline">{apiError}</span>
          </div>
        )}

        {/* Submit Button */}
        <div className="flex justify-end space-x-4 pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`bg-indigo-600 text-white font-semibold py-3 px-8 rounded-full shadow-md
                        hover:bg-indigo-700 hover:shadow-lg transition duration-300 ease-in-out
                        transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75
                        ${isSubmitting ? "opacity-60 cursor-not-allowed" : ""}`}
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </button>
          <button
            onClick={onClose}
            type="button"
            className="bg-gray-300 text-gray-800 font-semibold py-3 px-8 rounded-full shadow-md
                       hover:bg-gray-400 hover:shadow-lg transition duration-300 ease-in-out
                       transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-75"
          >
            cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUserForm;
